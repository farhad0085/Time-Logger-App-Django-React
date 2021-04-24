from django.contrib import admin
from .models import Company, UserAccount
from django.contrib.auth.models import Group
from django.contrib.sites.models import Site
from allauth.account.models import EmailAddress
from allauth.socialaccount.models import SocialAccount, SocialApp, SocialToken
from django.contrib.auth.admin import UserAdmin

class CompanyAdmin(admin.ModelAdmin):
    list_display = ['name', 'created_at', 'updated_at']


class UserAccountAdmin(UserAdmin):
    list_display = ['username', 'first_name', 'last_name', 'email', 'is_company_owner', 'company', 'is_superuser']

    list_filter = ['company']

    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser')}),
        ('Personal info', {'fields': 
            ('first_name', 'last_name', 'email', 'user_type', 'address', 'phone', 'city',
            'country', 'postal_code', 'company', 'is_company_owner')
        }),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )



admin.site.register(UserAccount, UserAccountAdmin)
admin.site.register(Company, CompanyAdmin)

# unregister unnecessary sites from django admin
admin.site.unregister([Group, Site])
admin.site.unregister([SocialAccount, SocialApp, SocialToken, EmailAddress])
