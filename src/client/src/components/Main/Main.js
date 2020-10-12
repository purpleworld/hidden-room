import React, {Fragment} from 'react';
import {Redirect, Switch, Route} from 'react-router-dom';
import {Container, Row} from 'react-bootstrap';

import PrivateRoute from '../CustomRoute/PrivateRoute';

import Header from '../Header/Header';
import Home from '../Home/Home';
import ChatList from '../ChatList/ChatList';

const Main = () => {
    return (
        <Fragment>
            <Header></Header>
            <Container className="h-100" fluid>
                <Row className="h-100">
                    <ChatList />
                </Row>
            </Container>

            <Switch>
                <PrivateRoute restricted="true" path="/home" component={Home}></PrivateRoute>
            </Switch>
            <Redirect to="/home" />
        </Fragment>
    );
};

export default Main;
