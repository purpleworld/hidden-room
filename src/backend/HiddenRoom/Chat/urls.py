from django.urls import path, re_path, include
from rest_framework import routers

from . import views, consumers

router = routers.DefaultRouter()

router.register(r'private-chatrooms', views.PrivateChatroomViewSet)


urlpatterns = [
    re_path('', include(router.urls)),
    re_path('room/(?P<room_id>\d+)/messages/$', views.PrivateMessageList.as_view())
]