import React from 'react';
import {Media} from 'react-bootstrap';

const Card = (data) => {
    return (
        <Media as="li">
            <img width={36} height={36} className="mr-3" src="holder.js/36x36" alt={data + "'s avatar"} />
            <Media.Body>
                <h6>{data}</h6>
            </Media.Body>
        </Media>
    );
};

export default Card;
