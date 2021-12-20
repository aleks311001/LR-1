from django.db import models
from django.contrib.auth.models import User


class Automata(models.Model):
    name = models.CharField(max_length=100)
    grammar = models.TextField()
    word_checked = models.CharField(max_length=100)
    date = models.DateField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    image = models.ImageField(blank=True, upload_to='automata_images')

    def __str__(self):
        return f'{self.name}: {self.word_checked}'
