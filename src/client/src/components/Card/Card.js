import React, {useState} from 'react';
import {Media, Button} from 'react-bootstrap';
import {BsX} from 'react-icons/bs';
import Cookies from 'js-cookie';

import './Card.scss';

const deleteFriend = async (props) => {
    console.log(props);
    const formdata = new FormData();
    formdata.append('user_id', props.user_id);
    formdata.append('user2_id', props.user2_id);

    let res = await fetch(`${process.env.API_URL}/api/v1/account/friends/`, {
        body: formdata,
        method: 'DELETE',
        headers: {Authorization: `Token ${Cookies.get('auth_token')}`},
    });

    if (res.ok) {
        console.log('deleted');
    } else {
        let error = await res.json();
        console.log(error);
    }
};

const options = (props) => {
    if (props.friend.relationship == 'PENDING') {
        return (
            <Button variant="hidden-option" onClick={deleteFriend}>
                <BsX size={20} />
            </Button>
        );
    }
};

const Card = (props) => {
    return (
        <Media as="li">
            <img width={36} height={36} className="mr-3" src="holder.js/36x36" />
            <Media.Body>
                <h6>{props.friend.account.username}</h6>
                <div className="options">{options(props)}</div>
            </Media.Body>
        </Media>
    );
};

export default Card;
