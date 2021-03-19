from django.contrib import admin
from .models import Chatroom, ChatroomUser, PrivateChatroom, PrivateMessage


admin.site.register(Chatroom)
admin.site.register(ChatroomUser)
admin.site.register(PrivateChatroom)
admin.site.register(PrivateMessage)