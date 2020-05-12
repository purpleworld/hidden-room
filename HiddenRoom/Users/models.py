from django.db import models
from django.conf import settings


class Profile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, primary_key=True)
    avatar = models.URLField(blank=True)
    status = models.CharField(max_length=42, blank=True)

    def __str__(self):
        return "%s's profile" % self.user