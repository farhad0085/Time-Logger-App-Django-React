from time_logger_project.views import index, view_404
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static


handler404 = view_404

urlpatterns = [
    path('admin/', admin.site.urls),

    # api
    path('api/auth/', include('user.urls')),
    path('api/time/', include('app_time.urls')),
    path('', index)
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)