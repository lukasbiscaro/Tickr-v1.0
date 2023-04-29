from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.decorators import parser_classes


from .models import MusicalGenre
from .serializers import MusicalGenreSerializer

import json


class musicalGenreView:
    @api_view(["GET"])
    def get_genres(request):
        if request.method == "GET":
            genres = MusicalGenre.objects.all()
            serializer = MusicalGenreSerializer(genres, many=True)

            return Response(serializer.data)

        return Response(status=400)

    @api_view(["GET", "PUT", "DELETE"])
    def manage_genre_by_id(request, id):
        genre = get_object_or_404(MusicalGenre, pk=id)
        try:
            genre = MusicalGenre.objects.get(pk=id)
        except:
            return Response(status=404)

        if request.method == "GET":
            serializer = MusicalGenreSerializer(genre)
            return Response(serializer.data)

        if request.method == "PUT":
            serializer = MusicalGenreSerializer(genre, data=request.data)

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=202)

            return Response(status=400)

        if request.method == "DELETE":
            try:
                genre_to_delete = MusicalGenre.objects.get(pk=id)
                genre_to_delete.delete()
                return Response(status=202)
            except:
                return Response(status=400)

    @api_view(["POST"])
    @parser_classes([MultiPartParser, FormParser])
    def create_genre(request):
        if request.method == "POST":
            new_genre = request.data

            serializer = MusicalGenreSerializer(data=new_genre)

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=201)

            return Response(status=400)
