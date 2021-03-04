from .base import *

DEBUG = False
EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"

CORS_ALLOW_ALL_ORIGINS = True


DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}
