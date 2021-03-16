import React, {useReducer, useEffect} from 'react';
import {Col, Navbar, Nav} from 'react-bootstrap';
import Cookies from 'js-cookie';

const Chat = () => {
    useEffect(() => {}, []);

    return (
        <Col md="10" xs="12" className="h-100 bg-dark">
            <Navbar bg="dark" variant="dark" className="justify-content-between align-items-center">
                <Navbar.Brand className="d-none d-sm-block"></Navbar.Brand>
            </Navbar>
        </Col>
    );
};

export default Chat;
