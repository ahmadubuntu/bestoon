from django.db import models
from django.contrib.auth.models import User
from .PasswordRestCodesModel import Passwordresetcodes
# Create your models here.
from django.utils.crypto import get_random_string
from .newsModels import News

class Token(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    token = models.CharField(max_length=48)
    #token = models.CharField(max_length=48, default=get_random_string(length=48))

    def __str__(self):
        return "{}-token".format(self.user)


class Expense(models.Model):
    text = models.CharField(max_length=255)
    date = models.DateTimeField()
    amount = models.BigIntegerField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return "{}-{}-{}".format(self.date, self.user, self.amount)


class Income(models.Model):
    text = models.CharField(max_length=255)
    date = models.DateTimeField()
    amount = models.BigIntegerField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return "{}-{}-{}".format(self.date, self.user, self.amount)
