from django.contrib import admin
from django.urls import include, path
from rest_framework import routers
from Users.views import UserViewSet, ProfileViewSet, FriendViewSet
from Chat.views import ChatroomViewSet, ChatroomUserViewSet, PrivateChatroomViewSet, MessageViewSet, PrivateMessageViewSet

router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'profiles', ProfileViewSet)
router.register(r'friends', FriendViewSet)

router.register(r'chatrooms', ChatroomViewSet)
router.register(r'chatroom-users', ChatroomUserViewSet)
router.register(r'private-chatrooms', PrivateChatroomViewSet)
router.register(r'messages', MessageViewSet)
router.register(r'private-messages', PrivateMessageViewSet)

urlpatterns = [
     path('', include('Client.urls')),
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
