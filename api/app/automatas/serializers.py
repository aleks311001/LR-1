from rest_framework import serializers
from .models import Automata
from app.serializers import UserSerializer


class AutomataSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Automata
        fields = ['id', 'name', 'grammar', 'regexp', 'image', 'user', 'date']
        read_only_fields = ['user', 'date']
