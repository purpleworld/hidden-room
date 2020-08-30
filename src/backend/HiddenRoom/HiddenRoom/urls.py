from django.contrib import admin
from django.urls import include, path, re_path
from rest_framework import routers
from rest_framework.authtoken import views 
from Users.views import UserViewSet, ProfileViewSet, FriendViewSet, GetToken
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
    re_path(r'^api/', include(router.urls)),
    re_path(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    re_path(r'^api/auth/', GetToken.as_view()),
    re_path(r'^api/account/', include('Users.urls')),
]
