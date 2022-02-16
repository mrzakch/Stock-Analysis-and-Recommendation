from django.shortcuts import render

# views.py
from rest_framework import viewsets, views
from rest_framework.response import Response
from rest_framework.decorators import action

from .serializers import PersonSerializer
from .models import User


class PersonViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('username')
    serializer_class = PersonSerializer

    @action(methods=['post'], detail=False)
    def getByName(self, request):
        person = User.objects.all().filter(name=request.data["username"])
        if person:
            return Response(status=200, data=True)
        return Response(status=204)