from django.contrib.auth.backends import ModelBackend
from django.contrib.auth.models import User
from django.db.models import Q


class AuthBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        
        try:
            user = User.objects.filter(Q(email=username) | Q(username=username)).first()
            if user.check_password(password):
                return user
        except:
            return None
