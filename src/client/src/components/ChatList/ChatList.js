import React, {useContext, useState, useEffect} from 'react';
import {Col, Media, Navbar} from 'react-bootstrap';
import 'holderjs';

const ChatList = () => {
    return (
        <Col md="2" xs="9" className="chats h-100">
            <Navbar variant="dark" className="justify-content-between align-items-center">
                <Navbar.Brand className="d-none d-sm-block">Messages</Navbar.Brand>
            </Navbar>
            <ul className="chat-list list-unstyled">
                <Media as="li">
                    <img width={64} height={64} className="mr-3" src="holder.js/36x36" alt="Generic placeholder" />
                    <Media.Body>
                        <h6>Placeholder</h6>
                    </Media.Body>
                </Media>
                <Media as="li">
                    <img width={64} height={64} className="mr-3" src="holder.js/36x36" alt="Generic placeholder" />
                    <Media.Body>
                        <h6>Placeholder</h6>
                    </Media.Body>
                </Media>
                <Media as="li">
                    <img width={64} height={64} className="mr-3" src="holder.js/36x36" alt="Generic placeholder" />
                    <Media.Body>
                        <h6>Placeholder</h6>
                    </Media.Body>
                </Media>
            </ul>
        </Col>
    );
};

export default ChatList;