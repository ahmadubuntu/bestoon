from __future__ import unicode_literals
from django.utils.crypto import get_random_string
from django.db import models
from django.contrib.auth.models import User



class News(models.Model):
    title = models.CharField(max_length=250)
    text = models.TextField()
    date = models.DateTimeField()
    #def __unicode__(self):
    def __str__(self):
        return self.title
