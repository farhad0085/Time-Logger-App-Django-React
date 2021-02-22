from django.db import models
from django.contrib.auth.models import User
import datetime


class TimeLog(models.Model):

    date = models.DateField(default=datetime.date.today)
    hours = models.FloatField(default=0)
    injury_noted = models.BooleanField(default=False)
    policy_violation_noted = models.BooleanField(default=False)
    comment = models.TextField(blank=True)
    
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-date']
        unique_together = ['date', 'created_by']