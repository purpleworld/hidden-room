from django.shortcuts import render, get_object_or_404, get_list_or_404
from rest_framework import viewsets, generics, authentication, permissions, response, mixins
from rest_framework.authtoken.views import ObtainAuthToken, APIView
from rest_framework.authtoken.models import Token

from .serializers import ProfileSerializer, UserSerializer, FriendSerializer
from django.contrib.auth.models import User
from .models import Profile, Friend


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
    

class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def retrieve(self, request, *args, **kwargs):
        self.object = get_object_or_404(Profile, user=self.request.user)
        return response.Response({
            'username': self.object.user.username,
            'avatar': self.object.avatar,
            'status': self.object.status,
        })


class FriendViewSet(viewsets.ModelViewSet):
    queryset = Friend.objects.all()
    serializer_class = FriendSerializer
    #authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def retrieve(self, request):
        queryset = Friend.objects.filter(user_id=self.request.user)
        serializer = FriendSerializer(queryset, many=True, context={'request': request})
        return response.Response(serializer.data)


class UpdateFriendView(generics.RetrieveUpdateAPIView):
    queryset = Friend.objects.all()
    serializer_class = FriendSerializer
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        user = self.request.user
        user2 = self.kwargs['user2_id']
        return get_object_or_404(Friend, user_id=user, user2_id=user2)
'''
    def update(self, request, *args, **kwargs):
        instance = get_object_or_404(Friend, user_id=self.request.user, user2_id=request.data.get('user2_id'))
        instance.relationship = request.data.get("relationship")
        instance.save()

        serializer = self.get_serializer(instance)
        if serializer.is_valid():
            self.perform_update(serializer)

        return instance
'''
class AccountCreate(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]


class GetToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request': request})

        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token = Token.objects.get(user=user)
        
        return response.Response({
            'token': token.key,
        })
