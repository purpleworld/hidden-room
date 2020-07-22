from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile, Friend


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}
        
    def create(self, validated_data):
        return User.objects.create_user(**validated_data)

    def update(self, instance, validated_data):
        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)

        password = validated_data.get('password', None)
        instance.set_password(password)
        instance.save()

        return instance


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
        extra_kwargs = {'since': {'read_only': True}}