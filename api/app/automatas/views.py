from django.shortcuts import render

from algo.lr_1_maker import build_automata
from .models import Automata
from .serializers import AutomataSerializer
from rest_framework import viewsets
from rest_framework import permissions
import datetime


class AutomataListView(viewsets.ModelViewSet):
    serializer_class = AutomataSerializer
    queryset = Automata.objects.all()
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.validated_data['user'] = self.request.user
        serializer.validated_data['date'] = datetime.date.today()
        # serializer.save()
        serializer.validated_data['image'] = build_automata(serializer.validated_data['grammar'],
                                                            serializer.validated_data['name'])
        # serializer.save()
        # return serializer.data
        return super().perform_create(serializer)

    def perform_update(self, serializer):
        serializer.validated_data['image'] = build_automata(serializer.validated_data['grammar'],
                                                            serializer.validated_data['name'])
        # print(serializer.data)
        # serializer.save()
        # return serializer.data
        return super().perform_update(serializer)
