from time_logger_project.views import index
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),

    # api
    path('api/auth/', include('user.urls')),
    path('api/time/', include('app_time.urls')),
    path('', index)
]
