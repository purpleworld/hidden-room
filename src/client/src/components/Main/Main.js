import React, {Fragment} from 'react';
import {useParams} from 'react-router-dom';
import {Row} from 'react-bootstrap';

import ChatList from '../ChatList/ChatList';
import FriendList from '../FriendList/FriendList';

const Main = () => {
    let {id} = useParams();
    return (
        <Fragment>
            <Row className="no-gutters h-100">
                <ChatList />
                {id == 'me' ? <FriendList /> : ''}
            </Row>
        </Fragment>
    );
};

export default Main;
