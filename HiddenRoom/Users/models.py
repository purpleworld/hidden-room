from django.db import models
from django.conf import settings


class Profile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, primary_key=True)
    avatar = models.URLField(blank=True)
    status = models.CharField(max_length=42, blank=True)

    def __str__(self):
        return "%s's profile" % self.user

class Friend(models.Model):
    RELATIONSHIP_STATUS = [
        ('PENDING', 'Pending'),
        ('FRIENDS', 'Friends'),
        ('BLOCKED', 'Blocked'),
        ('UNKNOWN', 'Unknown')
    ]

    user_id = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='user1_id')
    user2_id = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='user2_id', null=False)
    relationship = models.CharField(max_length=50, choices=RELATIONSHIP_STATUS, default='PENDING')
    since = models.DateTimeField(auto_now_add=True)