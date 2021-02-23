from django.urls import path, include
from .views import *
from rest_auth.views import PasswordResetConfirmView


urlpatterns = [
    path('user/me/', UserInfo.as_view()),
    path('user/<pk>/', SingleUser.as_view()),
    path('login/', LoginView.as_view()),
    path('register/', RegistrationView.as_view()),
    path('register/', include('rest_auth.registration.urls')),
    path('password/reset/confirm/<uidb64>/<token>/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    path('', include('rest_auth.urls')),
]
