from rest_framework import serializers
from .models import TimeLog

class TimeLogSerializer(serializers.ModelSerializer):

    hours = serializers.FloatField(max_value=24)

    class Meta:
        model = TimeLog
        fields = '__all__'
        read_only_fields = ['created_by']