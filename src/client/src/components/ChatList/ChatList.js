import React, {useContext, useState, useEffect, useReducer} from 'react';
import {Col, Media, Navbar} from 'react-bootstrap';
import Cookies from 'js-cookie';
import 'holderjs';

import Profile from '../Profile/Profile';

import ChatListReducer from './ChatListReducer';

const ChatList = () => {
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

    useEffect(() => {
        getChatrooms();
    }, []);

    return (
        <Col md="2" xs="9" className="chats h-100">
            <Navbar variant="dark" className="justify-content-between align-items-center">
                <Navbar.Brand>Messages</Navbar.Brand>
            </Navbar>
            <ul className="chat-list list-unstyled">
                <Media as="li">
                    <img width={36} height={36} className="mr-3" src="holder.js/36x36" alt="Generic placeholder" />
                    <Media.Body>
                        <h6>Placeholder</h6>
                    </Media.Body>
                </Media>
                <Media as="li">
                    <img width={36} height={36} className="mr-3" src="holder.js/36x36" alt="Generic placeholder" />
                    <Media.Body>
                        <h6>Placeholder</h6>
                    </Media.Body>
                </Media>
                <Media as="li">
                    <img width={36} height={36} className="mr-3" src="holder.js/36x36" alt="Generic placeholder" />
                    <Media.Body>
                        <h6>Placeholder</h6>
                    </Media.Body>
                </Media>
            </ul>
            <Profile />
        </Col>
    );
};

export default ChatList;
