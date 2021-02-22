from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver


class UserProfile(models.Model):
    """User profile for extending default django User model"""

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    phone = models.CharField(null=True, max_length=20)

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