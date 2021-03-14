from django.db import models
from django.contrib.auth.models import AbstractUser


class Company(models.Model):
    name = models.CharField(max_length=60)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Companies"


class UserAccount(AbstractUser):
    """ Represents a user profile inside our system """

    USER_TYPES = [
        ('employee', 'Employee'),
        ('contractor', 'Contractor')
    ]

    user_type = models.CharField(max_length=20, choices=USER_TYPES, default='employee')
    address = models.TextField(blank=True)
    phone = models.CharField(max_length=40, blank=True, null=True)
    city = models.CharField(max_length=40, blank=True, null=True)
    country = models.CharField(max_length=40, blank=True, null=True)
    postal_code = models.CharField(max_length=20, blank=True, null=True)
    company = models.ForeignKey(Company, on_delete=models.CASCADE, null=True, blank=True)
    is_company_owner = models.BooleanField(default=False)
