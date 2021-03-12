from time_logger_project.views import index, view_404
from django.contrib import admin
from django.urls import path, include

handler404 = view_404

urlpatterns = [
    path('admin/', admin.site.urls),

    # api
    path('api/auth/', include('user.urls')),
    path('api/time/', include('app_time.urls')),
    path('', index)
]
