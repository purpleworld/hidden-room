from django.urls import path
from . import views


urlpatterns = [
    path('create/', views.AccountCreate.as_view()),
    path('me/', views.ProfileViewSet.as_view({'get': 'retrieve'})),
    path('friends/', views.FriendViewSet.as_view({'get': 'retrieve'}))
]