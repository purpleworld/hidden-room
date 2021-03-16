import React, {useReducer, useEffect, useContext} from 'react';
import {Col, Navbar, Nav, InputGroup, Button, FormControl} from 'react-bootstrap';
import {useParams} from 'react-router-dom';
import Cookies from 'js-cookie';

import UserContext from '../../contexts/UserContext';
import ChatReducer from './ChatReducer';

const Chat = (props) => {
    const user = useContext(UserContext);
    const initState = {
        room: null,
    };

    const [state, dispatch] = useReducer(ChatReducer, initState);

    const getChatrooms = async () => {
        let res = await fetch(`${process.env.API_URL}/api/v1/chat/private-chatrooms/${props.roomID}/`, {
            method: 'GET',
            headers: {Authorization: `Token ${Cookies.get('auth_token')}`},
        });

        if (res.ok) {
            let response = await res.json();
            dispatch({type: 'get_room', room: response});
        } else {
            let error = await res.json();
            console.log(error);
        }
    };

    useEffect(() => {
        getChatrooms();
    }, [props.roomID]);

    return (
        <Col md="10" xs="12" className="chat h-100 bg-dark px-3">
            <Navbar bg="dark" variant="dark" className="justify-content-between align-items-center">
                <Navbar.Brand className="d-none d-sm-block">
                    {state.room ? (user.user.username == state.room.user1 ? state.room.user2 : state.room.user1) : ''}
                </Navbar.Brand>
            </Navbar>
            <div className="messages"></div>
            <InputGroup className="py-3">
                <FormControl placeholder="Message" aria-label="Message" aria-describedby="basic-addon2" />
                <InputGroup.Append>
                    <Button variant="outline-secondary">Send</Button>
                </InputGroup.Append>
            </InputGroup>
        </Col>
    );
};

export default Chat;
