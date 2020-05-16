from django.contrib import admin
from .models import Chatroom, ChatroomUser, PrivateChatroom


admin.site.register(Chatroom)
admin.site.register(ChatroomUser)
admin.site.register(PrivateChatroom)