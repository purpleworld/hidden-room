from django.contrib import admin
from .models import PrivateChatroom, PrivateMessage


admin.site.register(PrivateChatroom)
admin.site.register(PrivateMessage)