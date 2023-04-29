from rest_framework import serializers

from .models import MusicalGenre

class MusicalGenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = MusicalGenre
        fields = "__all__"
