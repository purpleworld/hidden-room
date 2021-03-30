from django.db import models
from django.conf import settings


class PrivateChatroom(models.Model):
    chatroom_id = models.BigAutoField(primary_key=True, unique=True)
    user1 = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='user1', null=False)
    user2 = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='user2', null=False)
    creation_date = models.DateTimeField(auto_now=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['user1', 'user2'], name='unique_private_chatroom') 
        ]
    def __str__(self):
        return f'{self.user1} & {self.user2}\'s Chatroom'


class PrivateMessage(models.Model):
    id = models.BigAutoField(primary_key=True)
    chatroom = models.ForeignKey(PrivateChatroom, on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=False)
    message = models.TextField()
    created_at = models.DateTimeField()