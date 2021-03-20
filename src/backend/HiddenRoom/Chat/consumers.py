import json
import datetime
from django.shortcuts import render, get_object_or_404, get_list_or_404
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async

from .models import PrivateMessage, PrivateChatroom


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        if self.scope['user'] == None:
            await self.close()

        self.room_id = self.scope['url_route']['kwargs']['room_id']
        self.room_group_name = f'room_{self.room_id}'

        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()


    async def disconnect(self):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )
        
    async def receive(self, text_data):
        data = json.loads(text_data)
        message = data['message']
        created_at = data['created_at']

        await self.save_message(data)
        await self.channel_layer.group_send(self.room_group_name, {'type': 'chat_message',
                                                                   'user': self.scope['user'].user ,
                                                                   'message': message,
                                                                   'created_at': created_at
                                                                   })

    async def chat_message(self, event):
        user = event['user']
        message = event['message']
        created_at = event['created_at']

        await self.send(text_data=json.dumps({
            'user': user,
            'message': message,
            'created_at': created_at
        }))

    @database_sync_to_async
    def save_message(self, data):
        created_at = datetime.datetime.fromtimestamp(data['created_at'])
        room = PrivateChatroom.objects.get(chatroom_id=int(self.room_id))
        message = PrivateMessage.objects.create(chatroom=room, message=data['message'], user=self.scope['user'], created_at=created_at)
        print(message)