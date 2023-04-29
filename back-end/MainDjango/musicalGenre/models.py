from django.db import models

class MusicalGenre(models.Model):
    genre = models.CharField(max_length=150, default="")

    def __str__(selƒ):
        return f"ID: {selƒ.id} | Local Name: {selƒ.genre}"
