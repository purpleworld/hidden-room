from django.contrib import admin
from .models import Chatroom, ChatroomUser, PrivateChatroom, Message, PrivateMessage


admin.site.register(Chatroom)
admin.site.register(ChatroomUser)
admin.site.register(PrivateChatroom)
admin.site.register(Message)
admin.site.register(PrivateMessage)