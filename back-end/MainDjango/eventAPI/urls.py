from django.contrib import admin
from django.urls import path

from .views import eventView

urlpatterns = [
    path("", eventView.get_events, name="get_all_events"),
    path("create/", eventView.create_event, name="create_event"),
    path("manage/<int:id>", eventView.manage_event_by_id, name="manage_by_id")
]
