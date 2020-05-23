from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import permissions
from .serializers import ChatroomSerializer, ChatroomUserSerializer, PrivateChatroomSerializer, MessageSerializer, PrivateMessageSerializer
from .models import Chatroom, ChatroomUser, PrivateChatroom, Message, PrivateMessage


class ChatroomViewSet(viewsets.ModelViewSet):
    queryset = Chatroom.objects.all()
    serializer_class = ChatroomSerializer
    permission_classes = [permissions.IsAuthenticated]

class ChatroomUserViewSet(viewsets.ModelViewSet):
    queryset = ChatroomUser.objects.all()
    serializer_class = ChatroomUserSerializer
    permission_classes = [permissions.IsAuthenticated]

class PrivateChatroomViewSet(viewsets.ModelViewSet):
    queryset = PrivateChatroom.objects.all()
    serializer_class = PrivateChatroomSerializer
    permission_classes = [permissions.IsAuthenticated]

class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    permission_classes = [permissions.IsAuthenticated]

class PrivateMessageViewSet(viewsets.ModelViewSet):
    queryset = PrivateMessage.objects.all()
    serializer_class = PrivateMessageSerializer
    permission_classes = [permissions.IsAuthenticated]