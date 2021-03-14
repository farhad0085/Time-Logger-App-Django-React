from rest_framework.generics import RetrieveUpdateDestroyAPIView
from app_time.permissions import IsCompanyOwner
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import *
from .permissions import AdminOrOwnProfile
from rest_auth.registration.views import RegisterView
from django.contrib.auth import authenticate
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.authtoken.models import Token
from rest_auth.views import PasswordChangeView
from django.contrib.auth import get_user_model

UserModel = get_user_model()


class LoginView(APIView):
    """Class based view loggin in user and returning Auth Token."""

    authentication_classes = [TokenAuthentication]
    permission_classes = [AllowAny]

    def post(self, request, format=None):
        data = request.data
        serializer_obj = LoginSerializer(data=data)

        if serializer_obj.is_valid():
            username = serializer_obj.data['username']
            password = serializer_obj.data['password']

            user = authenticate(username=username, password=password)
            if not user:
                return Response({'error': 'Invalid Credentials'}, status=401)

            token, _ = Token.objects.get_or_create(user=user)

            response_data = UserAccountSerializer(user).data
            response_data["token"] = token.key
            return Response(response_data, status=200)

        return Response(serializer_obj.errors, status=400)


class UserInfo(APIView):
    """Check the userinfo of a user"""

    def get(self, request):
        user = request.user
        serializer = UserAccountSerializer(user)
        return Response(serializer.data)


class RegistrationView(RegisterView):
    """Registration view for createing new user"""
    
    permission_classes = [AllowAny]
    serializer_class = RegistrationSerializer


class SingleUser(RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated, IsCompanyOwner]
    serializer_class = UserAccountSerializer
    queryset = UserModel.objects.all()

    def get_permissions(self):
        if self.request.method == ["GET", "DELETE"]:
            self.permission_classes = [IsAuthenticated, IsCompanyOwner]
        elif self.request.method in ["PUT", "PATCH"]:
            self.permission_classes = [IsAuthenticated, AdminOrOwnProfile]
        return [permission() for permission in self.permission_classes]


class UpdatePasswordView(PasswordChangeView):
    serializer_class = ChangePasswordSerializer