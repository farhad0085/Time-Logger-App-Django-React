from django.contrib import admin
from .models import *


class TimeLogAdmin(admin.ModelAdmin):
    list_display = ['date', 'duration', 'injury_noted', 'policy_violation_noted', 'comment', 'created_by', 'created_at', 'updated_at']


admin.site.register(TimeLog, TimeLogAdmin)