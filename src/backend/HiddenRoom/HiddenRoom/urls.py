from django.contrib import admin
from django.urls import include, path, re_path
from rest_framework.authtoken import views

from Users.views import ProfileViewSet, FriendViewSet, GetToken
from Chat.views import ChatroomViewSet, ChatroomUserViewSet, PrivateChatroomViewSet, MessageViewSet, PrivateMessageViewSet


urlpatterns = [
    re_path(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    re_path(r'^api/v1/auth/', GetToken.as_view()),
    re_path(r'^api/v1/account/', include('Users.urls')),
    re_path(r'^api/v1/chat/', include('Chat.urls')),
    path('admin/', admin.site.urls),
]
