from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.decorators import parser_classes


from .models import Event
from .serializers import EventSerializer

import json



class eventView:
    @api_view(["GET"])
    def get_events(request):
        if request.method == "GET":
            events = Event.objects.all()
            serializer = EventSerializer(events, many=True)

            return Response(serializer.data)

        return Response(status=400)

    @api_view(["GET", "PUT", "DELETE"])
    def manage_event_by_id(request, id):
        event = get_object_or_404(Event, pk=id)
        try:
            event = Event.objects.get(pk=id)
        except:
            return Response(status=404)

        if request.method == "GET":
            serializer = EventSerializer(event)
            return Response(serializer.data)

        if request.method == "PUT":
            serializer = EventSerializer(event, data=request.data)

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=202)

            return Response(status=400)

        if request.method == "DELETE":
            try:
                event_to_delete = Event.objects.get(pk=id)
                event_to_delete.delete()
                return Response(status=202)
            except:
                return Response(status=400)

    @api_view(["POST"])
    @parser_classes([MultiPartParser, FormParser])
    def create_event(request):
        if request.method == "POST":
            new_event = request.data

            serializer = EventSerializer(data=new_event)

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=201)
            
            return Response(status=400)
