from django.utils.deprecation import MiddlewareMixin
from django.http import JsonResponse
from rest_framework.authtoken.models import Token


def get_actual_value(request):
    if request.user is None:
        return None
    return request.user


class AccessControlMiddleware(MiddlewareMixin):
    def process_view(self, request, view_function, view_args, view_kwargs):
        auth_token = request.META.get('HTTP_AUTHORIZATION', None)
        # if auth_token is not None:
        #    method = request.method
        #    url_name = request.resolver_match.url_name
        #    try:
        #        user = Token.objects.get(key=auth_token.split(' ')[1]).user
        #    except:
        #        return JsonResponse({
        #            "detail": "Invalid authorization token."
        #        })
        #    if user.is_staff or user.is_institute_admin:
        #        try:
        #            user.role.permission.get(method=method, view_name=url_name)
        #        except:
        #            return JsonResponse({
        #                "detail": "You do not have permission to perform this action."
        #            })
