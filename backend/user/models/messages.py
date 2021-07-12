from django.db import models
from model_utils.models import TimeStampedModel
from .user import User


class Messages(TimeStampedModel):
    email = models.CharField(max_length=8024, blank=True)
    username = models.CharField(max_length=256, blank=True)
    feeback = models.CharField(max_length=8024, blank=True)