from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Chatroom, ChatroomUser, PrivateChatroom, Message, PrivateMessage


class ChatroomSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Chatroom
        fields = ['chatroom_id', 'name', 'creation_date']

class ChatroomUserSerializer(serializers.HyperlinkedModelSerializer):
    chatroom = serializers.HyperlinkedRelatedField(queryset=Chatroom.objects.all(), view_name='chatroom-detail')
    user = serializers.SlugRelatedField(queryset=User.objects.all(), slug_field='username')

    class Meta:
        model = ChatroomUser
        fields = ['chatroom', 'user', 'joined_date']
        extra_kwargs = {'joined_date': {'read_only': True}}

class PrivateChatroomSerializer(serializers.HyperlinkedModelSerializer):
    user1 = serializers.SlugRelatedField(queryset=User.objects.all(), slug_field='username')
    user2 = serializers.SlugRelatedField(queryset=User.objects.all(), slug_field='username')
    
    class Meta:
        model = PrivateChatroom
        fields = ['chatroom_id', 'user1', 'user2', 'creation_date']
        extra_kwargs = {'creation_date': {'read_only': True}}

class MessageSerializer(serializers.HyperlinkedModelSerializer):
    chatroom = serializers.HyperlinkedRelatedField(queryset=Chatroom.objects.all(), view_name='chatroom-detail')
    user_id = serializers.SlugRelatedField(queryset=User.objects.all(), slug_field='id')
    
    class Meta:
        model = Message
        fields = ['chatroom', 'message', 'user_id', 'content', 'created_at']
        extra_kwargs = {'created_at': {'read_only': True}, 'content': {'write_only': True}}

class PrivateMessageSerializer(serializers.HyperlinkedModelSerializer):
    chatroom = serializers.HyperlinkedRelatedField(queryset=Chatroom.objects.all(), view_name='chatroom-detail')
    user_id = serializers.SlugRelatedField(queryset=User.objects.all(), slug_field='id')
    
    class Meta:
        model = PrivateMessage
        fields = ['chatroom', 'message', 'user_id', 'content', 'created_at']
        extra_kwargs = {'created_at': {'read_only': True}, 'content': {'write_only': True}}