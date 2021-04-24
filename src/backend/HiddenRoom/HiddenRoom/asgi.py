import os
import django
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from .TokenAuthMiddleware import TokenAuthMiddleware

import Chat.routing

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'HiddenRoom.settings')
django.setup()
application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": TokenAuthMiddleware(
        URLRouter(
            Chat.routing.websocket_urlpatterns
        )
    ),
})