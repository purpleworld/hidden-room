import React, {useReducer, useEffect, useContext, useRef} from 'react';
import {Card} from 'react-bootstrap';
import Cookies from 'js-cookie';

const Message = (props) => {
    return (
        <Card>
            <Card.Body>
                <Card.Title>
                    <span>{props.username}</span>
                    <span>{props.date}</span>
                </Card.Title>
            </Card.Body>
            <Card.Text>{props.message}</Card.Text>
        </Card>
    );
};

export default Message;
