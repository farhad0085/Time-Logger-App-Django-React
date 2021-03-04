import os
from pathlib import Path
from dotenv import load_dotenv

ENV_PATH = os.path.join(Path(__file__).resolve().parent.parent.parent, '.env')
load_dotenv(ENV_PATH)

BASE_DIR = Path(__file__).resolve().parent.parent.parent
ENVIRONMENT = os.environ.get("ENVIRONMENT")
SECRET_KEY = os.environ.get("SECRET_KEY")
ALLOWED_HOSTS = ['*']


INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'user',
    'app_time',

    # rest
    'rest_framework',
    'rest_framework.authtoken',
    'django_filters',
    'corsheaders',

    # auth
    'django.contrib.sites',
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    "rest_auth",
    "rest_auth.registration",
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'time_logger_project.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'frontend', 'build')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'time_logger_project.wsgi.application'


AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    }
]


LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_L10N = True
USE_TZ = True


STATIC_URL = '/static/'
STATIC_ROOT = 'staticfiles'
STATICFILES_DIRS = [os.path.join(BASE_DIR, 'frontend', 'build', 'static')]


AUTHENTICATION_BACKENDS = ['user.backends.AuthBackend']

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
    'DEFAULT_FILTER_BACKENDS': (
        'django_filters.rest_framework.DjangoFilterBackend',
    ),
}

REST_AUTH_SERIALIZERS = {
    'PASSWORD_RESET_SERIALIZER': 'user.serializers.PasswordResetSerializer',
}

SITE_ID = 1


# emails for sending error mails
ADMINS = [
    (os.environ.get("ADMIN_EMAIL_NAME"), os.environ.get("ADMIN_EMAIL")),
]

# Email settings
SERVER_EMAIL = os.environ.get("SERVER_EMAIL") # used for sending error messages to email
DEFAULT_FROM_EMAIL = os.environ.get("EMAIL_HOST_USER")

EMAIL_HOST = os.environ.get("EMAIL_HOST")
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = os.environ.get("EMAIL_HOST_USER")
EMAIL_HOST_PASSWORD = os.environ.get("EMAIL_HOST_PASSWORD")

# rest auth password change settings
LOGOUT_ON_PASSWORD_CHANGE = False
OLD_PASSWORD_FIELD_ENABLED = True