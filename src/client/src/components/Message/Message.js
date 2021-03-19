import React, {useReducer, useEffect, useContext, useRef} from 'react';
import {Card} from 'react-bootstrap';
import Cookies from 'js-cookie';

const Message = (props) => {
    return (
        <Card className="h6">
            <Card.Body>
                <Card.Title>
                    <span>{props.message.username}</span>
                    <span>{props.message.date}</span>
                </Card.Title>
            </Card.Body>
            <Card.Text>{props.message.message}</Card.Text>
        </Card>
    );
};

export default Message;
