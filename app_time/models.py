from django.db import models
from django.contrib.auth.models import User
import datetime

class MinMaxFloat(models.FloatField):
    def __init__(self, min_value=None, max_value=None, *args, **kwargs):
        self.min_value, self.max_value = min_value, max_value
        super(MinMaxFloat, self).__init__(*args, **kwargs)

    def formfield(self, **kwargs):
        defaults = {'min_value': self.min_value, 'max_value' : self.max_value}
        defaults.update(kwargs)
        return super(MinMaxFloat, self).formfield(**defaults)

class TimeLog(models.Model):

    date = models.DateField(default=datetime.date.today)
    hours = MinMaxFloat(default=0, max_value=24)
    injury_noted = models.BooleanField(default=False)
    policy_violation_noted = models.BooleanField(default=False)
    comment = models.TextField(blank=True)
    
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-date']
        unique_together = ['date', 'created_by']