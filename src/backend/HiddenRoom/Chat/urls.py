from django.urls import path, re_path
from . import views


urlpatterns = [
    re_path('^private-room/', views.PrivateChatroomViewSet.as_view({'get': 'retrieve'})),
]