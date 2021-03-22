import React, {useReducer, useEffect, useContext, useRef} from 'react';
import {Col, Navbar, Nav, InputGroup, Button, FormControl} from 'react-bootstrap';
import Cookies from 'js-cookie';

import Message from '../Message/Message';

import UserContext from '../../contexts/UserContext';
import ChatReducer from './ChatReducer';

const Chat = (props) => {
    let ws = useRef();

    const user = useContext(UserContext);
    const initState = {
        room: null,
        message: '',
        messages: [],
    };

    const [state, dispatch] = useReducer(ChatReducer, initState);

    const getOldMessages = async () => {
        let res = await fetch(`${process.env.API_URL}/api/v1/chat/room/${props.roomID}/messages/`, {
            method: 'GET',
            headers: {Authorization: `Token ${Cookies.get('auth_token')}`},
        });

        if (res.ok) {
            let response = await res.json();
            dispatch({type: 'messages', messages: response.results.reverse()});
        }
    };

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

    const sendMessage = () => {
        const date = Date.now() / 1000;
        ws.current.send(
            JSON.stringify({
                message: state.message,
                created_at: date,
            })
        );
        dispatch({type: 'message', message: ''});
    };

    useEffect(() => {
        getChatrooms();
        getOldMessages();
        ws.current = new WebSocket(`ws://127.0.0.1:8000/chat/${props.roomID}/?token=${Cookies.get('auth_token')}`);
        ws.current.onclose = () => {
            console.log('closed');
        };

        return () => {
            ws.current.close();
            dispatch({type: 'messages', messages: []});
        };
    }, [props.roomID]);

    useEffect(() => {
        if (!ws.current) {
            return;
        }
        ws.current.onmessage = (e) => {
            dispatch({type: 'messages', messages: [...state.messages, JSON.parse(e.data)]});
        };
    }, [state.messages]);

    const m = state.messages.map((message, i) => {
        return <Message key={i} message={message} />;
    });

    return (
        <Col md="10" xs="12" className="chat h-100 bg-dark">
            <Navbar bg="dark" variant="dark" className="justify-content-between align-items-center">
                <Navbar.Brand className="d-none d-sm-block">
                    {state.room ? (user.user.username == state.room.user1 ? state.room.user2 : state.room.user1) : ''}
                </Navbar.Brand>
            </Navbar>
            <div className="messages">{m}</div>
            <InputGroup className="p-3">
                <FormControl
                    placeholder="Message"
                    onChange={(e) => dispatch({type: 'message', field: 'message', message: e.currentTarget.value})}
                    aria-label="Message"
                    aria-describedby="message-input"
                    value={state.message}
                />
                <InputGroup.Append>
                    <Button variant="hidden" onClick={sendMessage}>
                        Send
                    </Button>
                </InputGroup.Append>
            </InputGroup>
        </Col>
    );
};

export default Chat;
