import React, {useContext, useEffect} from 'react';
import {Row, Col} from 'react-bootstrap';
import 'holderjs';

import UserContext from '../../contexts/UserContext';

const Profile = () => {
    const user = useContext(UserContext);

    return (
        <div className="user-profile">
            <div className="avatar">
                <img width="36" height="36" class="mr-3" src="holder.js/36x36" />
            </div>
            <div className="username">{user.user.username}</div>
            <div className="options"></div>
        </div>
    );
};

export default Profile;
