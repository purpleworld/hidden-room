from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile, Friend


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email']

class ProfileSerializer(serializers.HyperlinkedModelSerializer):
    user = serializers.HyperlinkedRelatedField(queryset=User.objects.all(), view_name='user-detail')
    class Meta:
        model = Profile
        fields = ['user', 'avatar', 'status']

class FriendSerializer(serializers.HyperlinkedModelSerializer):
    user_id = serializers.HyperlinkedRelatedField(queryset=User.objects.all(), view_name='user-detail')
    class Meta:
        model = Friend
        fields = ['user_id', 'user2_id', 'relationship', 'since']