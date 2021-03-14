from rest_framework import permissions


class AdminOrOwnLog(permissions.BasePermission):
    message = "You're not allowed to perform this action"

    def has_object_permission(self, request, view, obj):
        if request.user.is_superuser:
            return True

        return obj.created_by == request.user


class IsCompanyOwner(permissions.BasePermission):
    message = "You're not allowed to perform this action"

    def has_permission(self, request, view):
        return request.user.is_company_owner