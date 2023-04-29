from django.contrib import admin
from django.urls import path

from .views import musicalGenreView

urlpatterns = [
    path("", musicalGenreView.get_genres, name="get_all_genres"),
    path("create/", musicalGenreView.create_genre, name="create_genre"),
    path("manage/<int:id>", musicalGenreView.manage_genre_by_id, name="manage_by_id")
]
