from django.urls import path, re_path
from . import views

urlpatterns = [
    path('create/', views.AccountCreate.as_view()),
    path('me/', views.ProfileViewSet.as_view({'get': 'retrieve'})),
    path('friends/', views.FriendViewSet.as_view({'get': 'retrieve'})),
    path('friends/update/<int:user2_id>/', views.UpdateFriendView.as_view())
]