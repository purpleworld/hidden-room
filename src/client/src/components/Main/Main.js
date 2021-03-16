import React, {Fragment} from 'react';
import {useParams} from 'react-router-dom';
import {Row} from 'react-bootstrap';

import ChatList from '../ChatList/ChatList';
import FriendList from '../FriendList/FriendList';
import Chat from '../Chat/Chat';

const Main = () => {
    let {id} = useParams();
    return (
        <Fragment>
            <Row className="no-gutters h-100">
                <ChatList />
                {id == 'me' ? <FriendList /> : <Chat roomID={id} />}
            </Row>
        </Fragment>
    );
};

export default Main;
