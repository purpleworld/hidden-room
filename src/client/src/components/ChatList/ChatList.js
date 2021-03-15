import React, {useContext, useState, useEffect, useReducer} from 'react';
import {Col, Media, Navbar} from 'react-bootstrap';
import Cookies from 'js-cookie';
import 'holderjs';

import Profile from '../Profile/Profile';

import ChatListReducer from './ChatListReducer';
import UserContext from '../../contexts/UserContext';

const ChatList = () => {
    const user = useContext(UserContext);
    const initState = {
        rooms: [],
    };

    const getChatrooms = async () => {
        let res = await fetch(`${process.env.API_URL}/api/v1/chat/private-chatrooms/`, {
            method: 'GET',
            headers: {Authorization: `Token ${Cookies.get('auth_token')}`},
        });

        if (res.ok) {
            let response = await res.json();
            dispatch({type: 'get_rooms', rooms: response});
        } else {
            let error = await res.json();
            console.log(error);
        }
    };

    const [state, dispatch] = useReducer(ChatListReducer, initState);

    const rooms = state.rooms.map((room) => {
        return (
            <Media as="li" key={room.chatroom_id}>
                <img width={36} height={36} className="mr-3" src="holder.js/36x36" alt="" />
                <Media.Body>
                    <h6>{user.user.username == room.user1 ? room.user2 : room.user1}</h6>
                </Media.Body>
            </Media>
        );
    });

    useEffect(() => {
        getChatrooms();
    }, []);

    return (
        <Col md="2" xs="9" className="chats h-100">
            <Navbar variant="dark" className="justify-content-between align-items-center">
                <Navbar.Brand>Messages</Navbar.Brand>
            </Navbar>
            <ul className="chat-list list-unstyled">{rooms}</ul>
            <Profile />
        </Col>
    );
};

export default ChatList;
