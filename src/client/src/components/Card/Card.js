import React from 'react';
import {Media} from 'react-bootstrap';

const Card = (props) => {
    return (
        <Media data-user-id={props.friend.id} as="li">
            <img width={36} height={36} className="mr-3" src="holder.js/36x36" />
            <Media.Body>
                <h6>{props.friend.username}</h6>
            </Media.Body>
        </Media>
    );
};

export default Card;
