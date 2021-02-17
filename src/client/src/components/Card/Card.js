import React, {useState, useContext} from 'react';
import {Media, Button, Figure} from 'react-bootstrap';
import {BsX, BsCheck} from 'react-icons/bs';
import Cookies from 'js-cookie';
import 'holderjs';

import UserContext from '../../contexts/UserContext';

const Card = (props) => {
    const user = useContext(UserContext);

    const deleteFriend = async (props) => {
        await fetch(`${process.env.API_URL}/api/v1/account/friends/${props.friend.id}/`, {
            method: 'DELETE',
            headers: {Authorization: `Token ${Cookies.get('auth_token')}`},
        });
        props.getFriends();
    };

    const addFriend = async (props) => {
        let formdata = new formdata();
        formdata.append('user_id', props.friend.user_id);
        formdata.append('user2_id', props.friend.user2_id);
        formdata.append('relationship', 'FRIENDS');

        await fetch(`${process.env.API_URL}/api/v1/account/friends/${props.friend.id}/update/`, {
            method: 'PATCH',
            headers: {Authorization: `Token ${Cookies.get('auth_token')}`},
            body: formData,
        });
        props.getFriends();
    };

    const options = (props) => {
        if (props.friend.relationship == 'PENDING') {
            return (
                <div>
                    {props.friend.user_id === user.id ? (
                        <Button variant="hidden-option" onClick={() => addFriend(props)}>
                            <BsCheck size={20} />
                        </Button>
                    ) : (
                        ''
                    )}

                    <Button variant="hidden-option" onClick={() => deleteFriend(props)}>
                        <BsX size={20} />
                    </Button>
                </div>
            );
        }
    };

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
