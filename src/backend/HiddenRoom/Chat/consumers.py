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
        date = data['date']

        await self.save_message(data)
        await self.channel_layer.group_send(self.room_group_name, {'type': 'chat_message',
                                                                   'username': self.scope['user'].username ,
                                                                   'message': message,
                                                                   'date': date
                                                                   })

    async def chat_message(self, event):
        username = event['username']
        message = event['message']
        date = event['date']

        await self.send(text_data=json.dumps({
            'username': username,
            'message': message,
            'date': date
        }))

    @database_sync_to_async
    def save_message(self, data):
        date = datetime.datetime.fromtimestamp(data['date'])
        room = PrivateChatroom.objects.get(chatroom_id=int(self.room_id))
        message = PrivateMessage.objects.create(chatroom=room, message=data['message'], user_id=self.scope['user'], created_at=date)