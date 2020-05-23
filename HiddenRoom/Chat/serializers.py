from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Chatroom, ChatroomUser, PrivateChatroom, Message, PrivateMessage


class ChatroomSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Chatroom
        fields = ['chatroom_id', 'name', 'creation_date']

class ChatroomUserSerializer(serializers.HyperlinkedModelSerializer):
    chatroom = serializers.HyperlinkedRelatedField(queryset=Chatroom.objects.all(), view_name='chatroom-detail')
    user = serializers.HyperlinkedRelatedField(queryset=User.objects.all(), view_name='user-detail')

    class Meta:
        model = ChatroomUser
        fields = ['chatroom', 'user', 'joined_date']

class PrivateChatroomSerializer(serializers.HyperlinkedModelSerializer):
    user1 = serializers.HyperlinkedRelatedField(queryset=User.objects.all(), view_name='user-detail')
    user2 = serializers.HyperlinkedRelatedField(queryset=User.objects.all(), view_name='user-detail')
    
    class Meta:
        model = PrivateChatroom
        fields = ['chatroom_id', 'user1', 'user2', 'creation_date']

class MessageSerializer(serializers.HyperlinkedModelSerializer):
    chatroom = serializers.HyperlinkedRelatedField(queryset=Chatroom.objects.all(), view_name='chatroom-detail')
    user_id = serializers.HyperlinkedRelatedField(queryset=User.objects.all(), view_name='user-detail')
    
    class Meta:
        model = Message
        fields = ['chatroom', 'message', 'user_id', 'content', 'created_at']

class PrivateMessageSerializer(serializers.HyperlinkedModelSerializer):
    chatroom = serializers.HyperlinkedRelatedField(queryset=Chatroom.objects.all(), view_name='chatroom-detail')
    user_id = serializers.HyperlinkedRelatedField(queryset=User.objects.all(), view_name='user-detail')
    
    class Meta:
        model = PrivateMessage
        fields = ['chatroom', 'message', 'user_id', 'content', 'created_at']