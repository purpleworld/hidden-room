from django.shortcuts import render, get_object_or_404, get_list_or_404
from rest_framework import viewsets, generics, authentication, permissions, response, status
from rest_framework.authtoken.views import ObtainAuthToken, APIView
from rest_framework.authtoken.models import Token
from rest_framework.exceptions import NotFound

from .serializers import ProfileSerializer, UserSerializer, FriendSerializer, AccountSerializer
from django.contrib.auth.models import User
from .models import Profile, Friend


class AccountDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [authentication.TokenAuthentication]

    def retrieve(self, request, *args, **kwargs):
        self.object = get_object_or_404(User, id=self.request.user.id)
        serializer = self.get_serializer(self.object)
        return response.Response(serializer.data)


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
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]
     
    def create(self, request, *args, **kwargs):
        data = dict(request.data)
        data['user_id'] = self.request.user.id
        data['user2_id'] = User.objects.get(username=data['username'][0]).id
        data.pop('username')
        print(data)
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return
        

    def perform_create(self, serializer):
        serializer.save()

    
    def retrieve(self, request):
        queryset = Friend.objects.filter(user_id=self.request.user)
        serializer = FriendSerializer(queryset, many=True, context={'request': request})
        return response.Response(serializer.data)


class UpdateFriendView(generics.UpdateAPIView):
    queryset = Friend.objects.all()
    serializer_class = FriendSerializer
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'user2_id'

    def get_object(self):
        queryset = self.filter_queryset(self.get_queryset())

        lookup_url_kwarg = self.lookup_url_kwarg or self.lookup_field

        assert lookup_url_kwarg in self.kwargs, (
            'Expected view %s to be called with a URL keyword argument '
            'named "%s". Fix your URL conf, or set the `.lookup_field` '
            'attribute on the view correctly.' %
            (self.__class__.__name__, lookup_url_kwarg)
        )

        filter_kwargs = {self.lookup_field: self.kwargs[lookup_url_kwarg]}
        obj = get_object_or_404(queryset, user_id=self.request.user.id, **filter_kwargs)

        self.check_object_permissions(self.request, obj)

        return obj


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
