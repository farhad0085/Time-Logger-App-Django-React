from django.urls import path
from .views import *


urlpatterns = [
    path('logs/', LogTimeListAPIView.as_view()),
    path('logs/create/', LogTimeCreateAPIView.as_view()),
    path('logs/<int:pk>/', LogTimeRetrieveUpdateDestroyAPIView.as_view()),
    path('users/', UserDataWithTimeLog.as_view()),
]