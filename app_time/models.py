from django.db import models
from django.core.validators import MaxValueValidator
import datetime
from django.contrib.auth import get_user_model

UserModel = get_user_model()


class TimeLog(models.Model):

    date = models.DateField(default=datetime.date.today)
    duration = models.IntegerField(default=0, validators=[MaxValueValidator(1440)]) # 1440 = 24 hours
    injury_noted = models.BooleanField(default=False)
    policy_violation_noted = models.BooleanField(default=False)
    comment = models.TextField(blank=True)
    company = models.ForeignKey('user.Company', on_delete=models.CASCADE, null=True)
    
    created_by = models.ForeignKey(UserModel, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-date']
        unique_together = ['date', 'created_by']