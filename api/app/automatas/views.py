from django.shortcuts import render

from algo.lr_1_maker import build_automata
from .models import Automata
from .serializers import AutomataSerializer
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from django.conf import settings
import datetime


class AutomataListView(viewsets.ModelViewSet):
    serializer_class = AutomataSerializer
    queryset = Automata.objects.all()
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.validated_data['user'] = self.request.user
        serializer.validated_data['date'] = datetime.date.today()

        # if not serializer.validated_data['image']:
        serializer.validated_data['image'] = build_automata(serializer.validated_data['grammar'],
                                                            serializer.validated_data['name'],
                                                            serializer.validated_data['word_checked'])[0]

        return super().perform_create(serializer)

    def perform_update(self, serializer):
        serializer.validated_data['image'] = build_automata(serializer.validated_data['grammar'],
                                                            serializer.validated_data['name'],
                                                            serializer.validated_data['word_checked'])[0]

        return super().perform_update(serializer)

    def get_queryset(self):
        # print(Automata.objects.all()[0].user.id, self.request.user.id)
        return Automata.objects.filter(user=self.request.user)


class BuildAutomata(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        # print(request.data)
        image_path, ans = build_automata(request.data['grammar'], request.data['name'], request.data['word_checked'])

        image_url = request.build_absolute_uri(settings.MEDIA_URL + image_path)

        # serializer.build_url_field('image', Automata)
        # print(">>> serializer: ", )
        return Response({'image': image_url, 'ans': ans})
