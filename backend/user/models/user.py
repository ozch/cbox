from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.utils.translation import gettext_lazy as _
from model_utils.models import TimeStampedModel
from rest_framework import status
from common.exceptions import APIError
from ..managers import UserManager


class User(AbstractBaseUser, PermissionsMixin, TimeStampedModel):
    email = models.EmailField(_('email address'), unique=True)
    first_name = models.CharField(_('first name'), max_length=30, blank=True)
    last_name = models.CharField(_('last name'), max_length=30, blank=True)
    is_superuser = models.BooleanField(_('superuser'), default=True)
    USERNAME_FIELD = 'email'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = UserManager()

    def check_role(self):
        if not self.is_superuser:
            if self.role is None:
                raise APIError({'details': 'User role is not set'}, status.HTTP_409_CONFLICT)
            if self.role.group == "CAMPUS" and self.is_admin:
                raise APIError({'details': 'Invalid role for institute account.'}, status.HTTP_409_CONFLICT)
            if self.role.group == "INSTITUTE" and not self.is_admin:
                raise APIError({'details': 'Invalid role for campus account.'}, status.HTTP_409_CONFLICT)

    def validate_campus_and_institute(self):
        if self.is_superuser:
            self.institute = None
            self.campus = None
        elif self.role.group == "CAMPUS":
            if self.campus is None:
                raise APIError({'details': 'Campus is not set.'}, status_code=status.HTTP_409_CONFLICT)
            if self.campus.institute.id != self.institute.id:
                raise APIError({'details': 'Campus, Institute ID mismatch.'}, status_code=status.HTTP_409_CONFLICT)
        elif self.role.group == "INSTITUTE":
            self.campus = None
            if self.institute is None:
                raise APIError({'details': 'Institute not set for institute account.'},
                               status_code=status.HTTP_409_CONFLICT)

    def clean(self):
        if self.is_admin or self.is_staff:
            self.is_superuser = False
        self.check_role()
        self.validate_campus_and_institute()
        return self

    def save(self, *args, **kwargs):
        # self.full_clean()
        return super(User, self).save(*args, **kwargs)

    def __str__(self):
        return self.email
