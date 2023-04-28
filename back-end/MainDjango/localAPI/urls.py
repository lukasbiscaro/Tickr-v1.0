from django.contrib import admin
from django.urls import path

from .views import localView

urlpatterns = [
    path("", localView.get_locals, name="get_all_locals"),
    path("create/", localView.create_local, name="create_local"),
    path("manage/<int:id>", localView.manage_local_by_id, name="manage_by_id")
]
