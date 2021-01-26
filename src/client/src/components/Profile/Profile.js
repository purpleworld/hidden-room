import React, {useContext, useEffect} from 'react';
import {Button, Tooltip, OverlayTrigger} from 'react-bootstrap';
import {BsGearFill, BsArrowBarRight} from 'react-icons/bs';
import {Redirect} from 'react-router-dom';
import Cookies from 'js-cookie';
import 'holderjs';

import UserContext from '../../contexts/UserContext';

const Profile = () => {
    const user = useContext(UserContext);

    const logout = () => {
        Cookies.remove('auth_token');
        window.location.href = '/login';
    };

    return (
        <div className="user-profile">
            <div className="avatar">
                <img width="36" height="36" className="mr-3" src="holder.js/36x36" />
            </div>
            <div className="username">{user.user.username}</div>
            <div className="options">
                <OverlayTrigger placement="top" overlay={<Tooltip>Settings</Tooltip>}>
                    <Button variant="hidden-profile">
                        <BsGearFill size={18} />
                    </Button>
                </OverlayTrigger>
                <OverlayTrigger placement="top" overlay={<Tooltip>Log Out</Tooltip>}>
                    <Button variant="hidden-profile" onClick={logout}>
                        <BsArrowBarRight size={18} />
                    </Button>
                </OverlayTrigger>
            </div>
        </div>
    );
};

export default Profile;
