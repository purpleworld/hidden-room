from rest_framework import serializers
from django.contrib.auth.models import User
from .models import PrivateChatroom, PrivateMessage


class PrivateChatroomSerializer(serializers.HyperlinkedModelSerializer):
    user1 = serializers.SlugRelatedField(queryset=User.objects.all(), slug_field='username')
    user2 = serializers.SlugRelatedField(queryset=User.objects.all(), slug_field='username')
    
    class Meta:
        model = PrivateChatroom
        fields = ['chatroom_id', 'user1', 'user2', 'creation_date']
        extra_kwargs = {'creation_date': {'read_only': True}}


class PrivateMessageSerializer(serializers.HyperlinkedModelSerializer):
    chatroom = serializers.HyperlinkedRelatedField(queryset=PrivateChatroom.objects.all(), view_name='chatroom-detail')
    user = serializers.SlugRelatedField(queryset=User.objects.all(), slug_field='username')
    
    class Meta:
        model = PrivateMessage
        fields = ['id', 'chatroom', 'user', 'message', 'created_at']
        extra_kwargs = {'content': {'write_only': True}}