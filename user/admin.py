from django.contrib import admin
from .models import Company, UserAccount
from django.contrib.auth.models import Group
from django.contrib.sites.models import Site
from allauth.account.models import EmailAddress
from allauth.socialaccount.models import SocialAccount, SocialApp, SocialToken

class CompanyAdmin(admin.ModelAdmin):
    list_display = ['name', 'created_at', 'updated_at']


class UserAccountAdmin(admin.ModelAdmin):
    list_display = ['username', 'first_name', 'last_name', 'email']

admin.site.register(UserAccount, UserAccountAdmin)
admin.site.register(Company, CompanyAdmin)

# unregister unnecessary sites from django admin
admin.site.unregister([Group, Site])
admin.site.unregister([SocialAccount, SocialApp, SocialToken, EmailAddress])
