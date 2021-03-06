import React, {useContext} from 'react';
import {Card} from 'react-bootstrap';
import PropTypes from 'prop-types';

import UserContext from '../../contexts/UserContext';

const Message = (props) => {
    const user = useContext(UserContext);

    const isToday = () => {
        const date = new Date(props.message.created_at);
        const today = new Date();
        const dateHour = date.toLocaleTimeString(navigator.language, {hour: '2-digit', minute: '2-digit'});

        if (
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
        ) {
            return `Today ${dateHour}`;
        } else {
            return date.toLocaleDateString(navigator.language);
        }
    };

    return (
        <Card className="message">
            <Card.Body>
                <Card.Title className="h6">
                    <span className={'user ' + (user.user.username == props.message.user ? 'me' : '')}>
                        {props.message.user}
                    </span>
                    <span className="date">{isToday()}</span>
                </Card.Title>
            </Card.Body>
            <Card.Text>{props.message.message}</Card.Text>
        </Card>
    );
};

Message.propTypes = {
    message: PropTypes.shape({
        id: PropTypes.number,
        chatroom: PropTypes.string,
        user: PropTypes.string,
        message: PropTypes.string,
        created_at: PropTypes.string,
    }),
};

export default Message;
