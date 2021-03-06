from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.views import APIView
from rest_framework.response import Response

from ..serializers import UserSerializer
from ..models import User


class MeView(APIView):
    parser_classes = (FormParser, MultiPartParser, JSONParser)

    def get(self, request, format=None):
        print(request.user.id)
        queryset = User.objects.get(id=request.user.id)
        serializer_class = UserSerializer(queryset, many=False)
        return Response(serializer_class.data)

    def post(self, request, format=None):
        password = request.data.get("password",None)
        name = request.data.get("first_name",None)
        email = request.data.get("email",None)
        user = User.objects.get(id=request.user.id)
        if password:
            user.set_password(password)
        if name:
            user.first_name = name
        if email:
            user.email = email
        user.save()
        serializer_class = UserSerializer(user, many=False)
        return Response(serializer_class.data)
