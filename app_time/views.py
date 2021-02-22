from rest_framework.response import Response
from app_time.serializers import TimeLogSerializer
from app_time.models import TimeLog
from app_time.permissions import AdminOrOwnLog
from rest_framework.generics import RetrieveUpdateDestroyAPIView
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.validators import ValidationError
import datetime

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
            if user.is_superuser:
                logs = TimeLog.objects.filter(
                    created_by=created_by_filter,
                    date__year=year_filter,
                    date__month=month_filter
                ).all()

        data = TimeLogSerializer(logs, many=True).data
        return Response(data, 200)


class LogTimeCreateAPIView(APIView):

    serializer = TimeLogSerializer

    def post(self, request):
        user = request.user
        data = request.data
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
            log.hours = serializer.validated_data.get('hours', 0)
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


    