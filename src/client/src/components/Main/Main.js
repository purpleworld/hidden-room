import React, {Fragment} from 'react';
import {Redirect, Switch, Route} from 'react-router-dom';
import {Container, Row} from 'react-bootstrap';

import PrivateRoute from '../CustomRoute/PrivateRoute';

import Home from '../Home/Home';
import ChatList from '../ChatList/ChatList';
import FriendList from '../FriendList/FriendList';

const Main = () => {
    return (
        <Fragment>
            <Row className="no-gutters h-100">
                <ChatList />
                <FriendList />
            </Row>

            <Switch>
                <PrivateRoute restricted="true" path="/home" component={Home}></PrivateRoute>
            </Switch>
            <Redirect to="/home" />
        </Fragment>
    );
};

export default Main;
