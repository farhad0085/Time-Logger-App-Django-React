from .models import UserProfile
from rest_framework import serializers
from django.contrib.auth.models import User
from rest_auth.registration.serializers import RegisterSerializer
from django.contrib.auth.forms import PasswordResetForm, SetPasswordForm
from django.conf import settings
from rest_auth.serializers import PasswordChangeSerializer

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()


class UserProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserProfile
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):

    profile = UserProfileSerializer(read_only=True)

    class Meta:
        model = User
        exclude = ['password', 'user_permissions', 'is_staff', 'groups']


class RegistrationSerializer(RegisterSerializer):

    phone = serializers.CharField(
        error_messages={
            'required': 'Phone number is required',
            'blank': "Please enter a valid phone number"
        }
    )
    email = serializers.EmailField(
        error_messages={
            'required': 'Email is required',
            'blank': "Please enter a valid email address"
        }
    )

    def custom_signup(self, request, user):
        user.profile.phone = self.validated_data.get('phone')
        user.save()


class PasswordResetSerializer(serializers.Serializer):
    """
    Custom Serializer for requesting a password reset e-mail.
    """
    email = serializers.EmailField()
    password_reset_form_class = PasswordResetForm
    

    def get_email_options(self):
        """Override this method to change default e-mail options"""

        extra_email_context = {
            "DEVELOPMENT": settings.ENVIRONMENT == 'development',
            "user_name": self.user.user_profile.name or self.user.username
        }
        return {
            'subject_template_name': 'reset-password-subject.txt',
            'html_email_template_name': 'reset-password-email.html',
            'email_template_name': 'reset-password-email.txt',
            'extra_email_context': extra_email_context
        }

    def validate_email(self, value):
        # Create PasswordResetForm with the serializer
        self.reset_form = self.password_reset_form_class(data=self.initial_data)
        if not self.reset_form.is_valid():
            raise serializers.ValidationError(self.reset_form.errors)
        
        if not User.objects.filter(email=value).exists():
            raise serializers.ValidationError('No account found for that email address')
        
        self.user = User.objects.get(email=value)
        
        return value

    def save(self):
        request = self.context.get('request')
        # Set some values to trigger the send_email method.
        opts = {
            'use_https': request.is_secure(),
            'from_email': getattr(settings, 'DEFAULT_FROM_EMAIL'),
            'request': request,
        }

        opts.update(self.get_email_options())
        self.reset_form.save(**opts)


class ChangePasswordSerializer(PasswordChangeSerializer):
    old_password = serializers.CharField(
        max_length=128,
        error_messages={
            'required': 'Old password is required',
            'blank': "Please enter your account's old password"
        }
    )
    new_password1 = serializers.CharField(
        max_length=128,
        error_messages={
            'required': 'New password is required',
            'blank': "Please enter new password"
        }
    )
    new_password2 = serializers.CharField(
        max_length=128,
        error_messages={
            'required': 'Confirm password is required',
            'blank': "Please enter confirm password"
        }
    )

    def validate_old_password(self, value):
        invalid_password_conditions = (
            self.old_password_field_enabled,
            self.user,
            not self.user.check_password(value)
        )

        if all(invalid_password_conditions):
            raise serializers.ValidationError("Old password didn't match")
        return value