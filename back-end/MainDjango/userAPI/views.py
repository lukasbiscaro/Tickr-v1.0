from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import authenticate
from django.contrib.auth.models import User

from .serializers import UserSerializer


class UserView(APIView):

    def get(self, request, format=None):

        locals = User.objects.all()
        serializer = UserSerializer(locals, many=True)

        return Response(serializer.data)

    def post(self, request, format=None):

        user_data = request.data

        user_serializer = UserSerializer(data=user_data)
        if user_serializer.is_valid(raise_exception=False):
            user_serializer.save()

            return Response({'user': user_serializer.data}, status=200)

        return Response({"message:": "error"}, status=400)


class UserLoginView(APIView):
    def get(self, request, format=None):

        if request.user.is_authenticated == False or request.user.is_active == False:
            return Response("Invalid Credentials", status=403)

        user = UserSerializer(request.user)

        return Response(user.data, status=200)

    def post(self, request, format=None):

        user_obj = User.objects.filter(email=request.data['username']).first(
        ) or User.objects.filter(username=request.data['username']).first()

        if user_obj is not None:
            credentials = {
                "username": user_obj.username,
                "password": request.data['password']
            }

        user = authenticate(**credentials)

        if user and user.is_active:

            user_serializer = UserSerializer(user)

            return Response(user_serializer.data, status=200)

        return Response("Invalid Credentials", status=403)
