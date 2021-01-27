import React, {useContext, useReducer} from 'react';
import {Button, Tooltip, OverlayTrigger} from 'react-bootstrap';
import {BsGearFill, BsArrowBarRight} from 'react-icons/bs';
import Cookies from 'js-cookie';
import 'holderjs';

import UserSettings from '../UserSettings/UserSettings';

import UserContext from '../../contexts/UserContext';
import ProfileReducer from './ProfileReducer';

const Profile = () => {
    const initState = {
        modal: false,
    };

    const user = useContext(UserContext);

    const logout = () => {
        Cookies.remove('auth_token');
        window.location.href = '/login';
    };

    const handleModal = () => {
        if (state.modal) {
            dispatch({type: 'modal', modal: false});
        } else {
            dispatch({type: 'modal', modal: true});
        }
    };

    const [state, dispatch] = useReducer(ProfileReducer, initState);

    return (
        <div className="user-profile">
            <div className="avatar">
                <img width="36" height="36" className="mr-3" src="holder.js/36x36" />
            </div>
            <div className="username">{user.user.username}</div>
            <div className="options">
                <OverlayTrigger placement="top" overlay={<Tooltip>Settings</Tooltip>}>
                    <Button variant="hidden-profile" onClick={handleModal}>
                        <BsGearFill size={18} />
                    </Button>
                </OverlayTrigger>
                <OverlayTrigger placement="top" overlay={<Tooltip>Log Out</Tooltip>}>
                    <Button variant="hidden-profile" onClick={logout}>
                        <BsArrowBarRight size={18} />
                    </Button>
                </OverlayTrigger>
            </div>
            {state.modal ? <UserSettings show={state.modal} handleModal={handleModal} /> : null}
        </div>
    );
};

export default Profile;
