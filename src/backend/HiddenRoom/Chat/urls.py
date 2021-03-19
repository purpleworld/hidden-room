from django.urls import path, re_path, include
from rest_framework import routers

from . import views, consumers

router = routers.DefaultRouter()

router.register(r'chatrooms',views.ChatroomViewSet)
router.register(r'chatroom-users', views.ChatroomUserViewSet)
router.register(r'private-chatrooms', views.PrivateChatroomViewSet)
router.register(r'private-messages', views.PrivateMessageViewSet)


urlpatterns = [
    re_path('', include(router.urls)),
]