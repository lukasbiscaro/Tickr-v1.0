from django.urls import path

from .views import TestView
from rest_framework_jwt.views import refresh_jwt_token, verify_jwt_token


urlpatterns = [
    path('test', TestView.as_view()),
]
