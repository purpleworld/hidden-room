from django.urls import path
from . import views


urlpatterns = [
    path('create/', views.AccountCreate.as_view())
]