from rest_framework import serializers
from .models import Automata
from app.serializers import UserSerializer


class AutomataSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    image = serializers.SerializerMethodField('get_image_url')

    class Meta:
        model = Automata
        fields = ['id', 'name', 'grammar', 'word_checked', 'image', 'user', 'date']
        read_only_fields = ['user', 'date']

    def get_image_url(self, obj):
        return obj.image.url
