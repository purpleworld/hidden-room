import React, {useReducer, useEffect, useContext, useRef} from 'react';
import {Card} from 'react-bootstrap';

const Message = (props) => {
    return (
        <Card className="h6">
            <Card.Body>
                <Card.Title>
                    <span>{props.message.user}</span>
                    <span>{props.message.created_at}</span>
                </Card.Title>
            </Card.Body>
            <Card.Text>{props.message.message}</Card.Text>
        </Card>
    );
};

export default Message;
