from app_time.views import IndexView
from django.contrib import admin
from django.urls import path, include, re_path

urlpatterns = [
    path('admin/', admin.site.urls),

    # api
    path('api/auth/', include('user.urls')),
    path('api/time/', include('app_time.urls')),
    re_path(r'.*', IndexView.as_view()),
]
