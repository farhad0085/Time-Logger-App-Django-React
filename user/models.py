from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver


class UserProfile(models.Model):
    """User profile for extending default django User model"""

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    address = models.TextField(blank=True)
    phone = models.CharField(max_length=40, blank=True, null=True)
    city = models.CharField(max_length=40, blank=False, null=True)
    country = models.CharField(max_length=40, blank=True, null=True)
    postal_code = models.CharField(max_length=20, blank=True, null=True)


    def __str__(self):
        return self.user.username


# signals
@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    """create profile for user."""

    if created:
        UserProfile.objects.create(user=instance)
        

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()