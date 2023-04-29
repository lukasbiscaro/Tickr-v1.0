from django.urls import path

from .views import UserView, UserLoginView
from rest_framework_jwt.views import refresh_jwt_token, verify_jwt_token


urlpatterns = [
    path('create/', UserView.as_view()),
    path('get-user/', UserView.as_view()),
    path('login-user/', UserLoginView.as_view())
]
