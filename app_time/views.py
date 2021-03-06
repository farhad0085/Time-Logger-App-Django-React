from app_time.utils import create_excel_file, format_time
from rest_framework.response import Response
from app_time.serializers import TimeLogSerializer
from app_time.models import TimeLog
from app_time.permissions import AdminOrOwnLog, IsCompanyOwner
from rest_framework.generics import RetrieveUpdateDestroyAPIView
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.validators import ValidationError
from django.contrib.auth import get_user_model
from user.models import Company
import datetime

UserModel = get_user_model()

class LogTimeListAPIView(APIView):

    today = datetime.date.today()

    def get(self, request):
        user = request.user
        logs = TimeLog.objects.filter(
            created_by=user,
            date__year=self.today.year,
            date__month=self.today.month
        ).all()
        data = TimeLogSerializer(logs, many=True).data
        
        for item in data:
            item['duration'] = format_time(item['duration'])
        return Response(data, 200)

    def post(self, request):
        user = request.user
        data = request.data
        year_filter = data.get('year', self.today.year)
        month_filter = data.get('month', self.today.month)
        created_by_filter = data.get('created_by')

        logs = TimeLog.objects.filter(
            created_by=user,
            date__year=year_filter,
            date__month=month_filter
        ).all()

        if created_by_filter:
            if user.is_company_owner:
                logs = TimeLog.objects.filter(
                    created_by=created_by_filter,
                    date__year=year_filter,
                    date__month=month_filter
                ).all()

        data = TimeLogSerializer(logs, many=True).data

        for item in data:
            item['duration'] = format_time(item['duration'])
        return Response(data, 200)


class LogTimeCreateAPIView(APIView):

    serializer = TimeLogSerializer

    def post(self, request):
        user = request.user
        data = request.data
        data['company'] = user.company.id
        serializer = self.serializer(data=data)
        
        if serializer.is_valid(raise_exception=True):
            date = serializer.validated_data.get('date')
            if date > datetime.date.today():
                data = {
                    "success": False,
                    "message": "Can't log future date"
                }
                return Response(data, 403)

            log, created = TimeLog.objects.get_or_create(created_by=user, date=date)
            if not created:
                data = {
                    "success": False,
                    "message": f"You've already logged time for {date}"
                }
                return Response(data, 403)

            log.created_by = user
            log.duration = serializer.validated_data.get('duration', 0)
            log.injury_noted = serializer.validated_data.get('injury_noted', False)
            log.policy_violation_noted = serializer.validated_data.get('policy_violation_noted', False)
            log.comment = serializer.validated_data.get('comment', '')
            log.save()

            data = self.serializer(log).data
            data['success'] = True

            return Response(data, 200)


class LogTimeRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    serializer_class = TimeLogSerializer
    queryset = TimeLog.objects.all()
    permission_classes = [IsAuthenticated, AdminOrOwnLog]

    def perform_update(self, serializer):
        if serializer.is_valid(raise_exception=True):
            date = serializer.validated_data.get('date')

            if date:
                log = TimeLog.objects.get(id=self.kwargs['pk'])
                logs_for_date = TimeLog.objects.filter(date=date, created_by=self.request.user).first()
                
                if date > datetime.date.today():
                    data = {
                        "success": False,
                        "message": "Sorry, future date not allowed"
                    }
                    raise ValidationError(data)
                if logs_for_date:
                    if logs_for_date != log:
                        if (logs_for_date.created_by == log.created_by):
                            data = {
                                "success": False,
                                "message": f"You've already logged time for {date}"
                            }
                            raise ValidationError(data)
        serializer.save()


class UserDataWithTimeLog(APIView):

    permission_classes = [IsAuthenticated, IsCompanyOwner]

    def get(self, request):
        today = datetime.date.today()
        month_first_day = today.replace(day=1)

        users = UserModel.objects.all()
        
        if request.user.is_company_owner and not request.user.is_superuser:
            users = users.filter(company=request.user.company).exclude(is_company_owner=True)


        response_data = []
        for user in users:
            logs = TimeLog.objects.filter(created_by=user, date__range=[month_first_day, today]).all()
            response_data.append({
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "duration": format_time(sum(log.duration for log in logs)),
                "company": user.company.name
            })

        return Response(response_data, 200)


class LogReportView(APIView):
    """Report for date range"""

    permission_classes = [IsAuthenticated, IsCompanyOwner]

    def get_dates(self, start_date, end_date):
        days_difference = (end_date - start_date).days
        dates = [date for date in [(end_date - datetime.timedelta(days=i)) for i in range(days_difference + 1)]]
        return list(reversed(dates))


    def post(self, request):
        data = request.data
        user = request.user

        start_date = data.get("start_date", datetime.date.today().replace(day=1).strftime("%Y-%m-%d"))
        end_date = data.get("end_date", datetime.date.today().strftime("%Y-%m-%d"))
        
        start_date = datetime.datetime.strptime(start_date, '%Y-%m-%d')
        end_date = datetime.datetime.strptime(end_date, '%Y-%m-%d')

        if start_date > end_date:
            start_date, end_date = end_date, start_date

        all_dates = self.get_dates(start_date, end_date)

        if user.is_superuser:
            company = Company.objects.filter(id=data.get("company")).first()
        else:
            company = user.company

        if user.is_superuser and not company:
            # data if no company selected
            data = []
            all_companies = Company.objects.all()


            for single_company in all_companies:
                company_users = single_company.useraccount_set.all().exclude(is_company_owner=True)
                company_data = {
                    "company": single_company.name,
                    "date_range": f"{start_date.strftime('%d %B, %Y')} - {end_date.strftime('%d %B, %Y')}",
                    "data": []
                }
                
                for c_user in company_users:
                    logs = TimeLog.objects.filter(created_by=c_user, date__range=[start_date, end_date]).all()
                    
                    total_time = 0
                    total_injury_noted = 0
                    total_policy_violation_noted = 0
                    for l in logs:
                        total_time += l.duration
                        total_injury_noted += int(l.injury_noted)
                        total_policy_violation_noted += int(l.policy_violation_noted)

                    user_data = {
                        "user": c_user.get_full_name() or c_user.username,
                        "data": [],
                        "total": {
                            "time": format_time(total_time),
                            "injury_noted": total_injury_noted,
                            "policy_violation_noted": total_policy_violation_noted
                        }
                    }
                    
                    for date in all_dates:
                        day_time = 0
                        day_injury_noted = 0
                        day_policy_violation_noted = 0
                        for l in logs.filter(date=date):
                            day_time += l.duration
                            day_injury_noted += int(l.injury_noted)
                            day_policy_violation_noted += int(l.policy_violation_noted)

                        user_data["data"].append({
                            "date": date.strftime("%d %B, %Y"),
                            "time": format_time(day_time),
                            "injury_noted": bool(day_injury_noted),
                            "policy_violation_noted": bool(day_policy_violation_noted)
                        })
                    company_data["data"].append(user_data)
                
                data.append(company_data)
            
            excel_filename = create_excel_file(data)
            result_data = {
                'data': data,
                'export': {
                    'excel': f"/media/excel/{excel_filename}",
                    'pdf': ''
                }
            }
            return Response(result_data)


        # dummy data if a company is selected
        company_users = company.useraccount_set.all().exclude(is_company_owner=True)
        
        data = {
            "date_range": f"{start_date.strftime('%d %B, %Y')} - {end_date.strftime('%d %B, %Y')}",
            "company": company.name,
            "data": []
        }

        for c_user in company_users:
            logs = TimeLog.objects.filter(created_by=c_user, date__range=[start_date, end_date]).all()

            total_time = 0
            total_injury_noted = 0
            total_policy_violation_noted = 0
            for l in logs:
                total_time += l.duration
                total_injury_noted += int(l.injury_noted)
                total_policy_violation_noted += int(l.policy_violation_noted)

            user_data = {
                "user": c_user.get_full_name() or c_user.username,
                "data": [],
                "total": {
                    "time": format_time(total_time),
                    "injury_noted": total_injury_noted,
                    "policy_violation_noted": total_policy_violation_noted
                }
            }
            
            for date in all_dates:
                day_time = 0
                day_injury_noted = 0
                day_policy_violation_noted = 0
                for l in logs.filter(date=date):
                    day_time += l.duration
                    day_injury_noted += int(l.injury_noted)
                    day_policy_violation_noted += int(l.policy_violation_noted)

                user_data["data"].append({
                    "date": date.strftime("%d %B, %Y"),
                    "time": format_time(day_time),
                    "injury_noted": bool(day_injury_noted),
                    "policy_violation_noted": bool(day_policy_violation_noted)
                })
            data["data"].append(user_data)
        
        excel_filename = create_excel_file([data])
        result_data = {
            'data': [data],
            'export': {
                'excel': f"/media/excel/{excel_filename}",
                'pdf': ''
            }
        }
        return Response(result_data)
