import React, {useReducer, useEffect, useContext, useRef} from 'react';
import {Col, Navbar, Nav, InputGroup, Button, FormControl} from 'react-bootstrap';
import Cookies from 'js-cookie';

import Message from '../Message/Message';

import UserContext from '../../contexts/UserContext';
import ChatReducer from './ChatReducer';

const Chat = (props) => {
    let ws = useRef();
    let messagesDiv = useRef();

    const user = useContext(UserContext);
    const initState = {
        room: null,
        message: '',
        messages: [],
        next: null,
    };

    const [state, dispatch] = useReducer(ChatReducer, initState);

    const getOldMessages = async (url) => {
        let res = await fetch(url, {
            method: 'GET',
            headers: {Authorization: `Token ${Cookies.get('auth_token')}`},
        });

        let response = await res.json();
        return response;
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

    const scrollEvent = () => {
        if (messagesDiv.current.scrollTop <= 0) {
            getOldMessages(state.next).then((res) => {
                dispatch({type: 'messages', messages: [...res.results.reverse(), ...state.messages]});
                dispatch({type: 'next', next: res.next});
                document.querySelectorAll('.message')[20].scrollIntoView();
            });
        }
    };

    const msg = state.messages.map((message, i) => {
        return <Message key={i} message={message} />;
    });

    useEffect(() => {
        getChatrooms();
        getOldMessages(`${process.env.API_URL}/api/v1/chat/room/${props.roomID}/messages/`).then((res) => {
            dispatch({type: 'messages', messages: res.results.reverse()});
            dispatch({type: 'next', next: res.next});
            document.querySelector('.messages').scrollTo(0, document.querySelector('.messages').scrollHeight);
        });

        ws.current = new WebSocket(`ws://127.0.0.1:8000/chat/${props.roomID}/?token=${Cookies.get('auth_token')}`);

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

    useEffect(() => {
        if (state.next != null) {
            messagesDiv.current.addEventListener('scroll', scrollEvent);
        }

        return () => {
            messagesDiv.current.removeEventListener('scroll', scrollEvent);
        };
    });

    return (
        <Col md="10" xs="12" className="chat h-100 bg-dark">
            <Navbar bg="dark" variant="dark" className="justify-content-between align-items-center">
                <Navbar.Brand className="d-sm-block">
                    {state.room ? (user.user.username == state.room.user1 ? state.room.user2 : state.room.user1) : ''}
                </Navbar.Brand>
            </Navbar>
            <div className="messages" ref={messagesDiv}>
                {msg}
            </div>
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
