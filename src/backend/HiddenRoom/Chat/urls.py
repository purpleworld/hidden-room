from django.urls import path, re_path, include
from rest_framework import routers
from . import views


router = routers.DefaultRouter()

router.register(r'chatrooms',views.ChatroomViewSet)
router.register(r'chatroom-users', views.ChatroomUserViewSet)
router.register(r'private-chatrooms', views.PrivateChatroomViewSet)
router.register(r'messages', views.MessageViewSet)
router.register(r'private-messages', views.PrivateMessageViewSet)


urlpatterns = [
    #re_path('^private-room/', views.PrivateChatroomViewSet.as_view({'get': 'retrieve'})),
    re_path('', include(router.urls)),
]