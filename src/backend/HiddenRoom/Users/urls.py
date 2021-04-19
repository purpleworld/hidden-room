from django.urls import path, re_path
from rest_framework import routers
from . import views

urlpatterns = [
    path('create/', views.AccountCreate.as_view()),
    path('check/email/', views.CheckEmail.as_view()),
    path('check/username/', views.CheckUsername.as_view()),
    
    path('me/', views.ProfileViewSet.as_view({'get': 'retrieve'})),
    path('me/detail/', views.AccountDetail.as_view(), name="profile-detail"),
    path('me/update/<int:pk>/', views.UpdateAccount.as_view()),
    
    path('friend/<int:pk>/detail/', views.FriendDetail.as_view()),
    path('friends/', views.FriendViewSet.as_view({'get': 'retrieve'})),
    path('friends/add/', views.FriendViewSet.as_view({'post': 'create'})),
    path('friends/<int:pk>/update/', views.FriendViewSet.as_view({'patch':'update'})),
    path('friends/<int:pk>/',  views.FriendViewSet.as_view({'delete': 'destroy'})),
]