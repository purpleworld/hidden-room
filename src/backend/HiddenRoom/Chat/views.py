from django.db.models import Q
from django.shortcuts import render
from django.contrib.auth.models import User

from rest_framework import viewsets, authentication, response, generics
from rest_framework import permissions
from rest_framework.pagination import LimitOffsetPagination

from .serializers import ChatroomSerializer, ChatroomUserSerializer, PrivateChatroomSerializer, PrivateMessageSerializer
from .models import Chatroom, ChatroomUser, PrivateChatroom, PrivateMessage


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
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    
    def list(self, request):
        user2 = self.request.query_params.get('user2', None)
        
        if(user2 is not None):
            queryset = PrivateChatroom.objects.filter(Q(user1=self.request.user, user2=user2) | Q(user1=user2, user2=self.request.user))
        else:
            queryset = PrivateChatroom.objects.filter(Q(user1=self.request.user) | Q(user2=self.request.user))
  
        serializer = PrivateChatroomSerializer(queryset, many=True, context={'request': request})
        return response.Response(serializer.data)


class PrivateMessageList(generics.ListAPIView):
    serializer_class = PrivateMessageSerializer
    pagination_class = LimitOffsetPagination
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = PrivateMessage.objects.filter(chatroom=self.kwargs['room_id']).order_by('id').reverse()
        return queryset