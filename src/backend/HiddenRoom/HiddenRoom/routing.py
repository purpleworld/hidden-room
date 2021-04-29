from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from .TokenAuthMiddleware import TokenAuthMiddleware
import Chat.routing


application = ProtocolTypeRouter({
    "websocket": TokenAuthMiddleware(
        URLRouter(
            Chat.routing.websocket_urlpatterns
        )
    ),
})