from django.db import models
from model_utils.models import TimeStampedModel
from .user import User


class Orders(TimeStampedModel):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    height = models.IntegerField()
    width = models.IntegerField()
    length = models.IntegerField()
    number = models.IntegerField()
    image = models.ImageField()
    price = models.IntegerField()
    address = models.CharField(max_length=1024)
    note = models.CharField(max_length=1024)
    contact = models.CharField(max_length=32)
    card_type = models.CharField(max_length=64, default="3-Ply CardBoard Simple")
    status = models.CharField(max_length=64,default="Pending")

