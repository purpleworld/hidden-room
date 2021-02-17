import React, {useContext, useState, useEffect} from 'react';
import {Col, Media, Navbar} from 'react-bootstrap';
import 'holderjs';

import Profile from '../Profile/Profile';

const ChatList = () => {
    const getChatrooms = () => {
        return;
    };
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
