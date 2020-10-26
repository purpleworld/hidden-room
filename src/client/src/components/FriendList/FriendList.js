import React, {useContext, useReducer, useEffect, Fragment} from 'react';
import {Col, Media, Navbar} from 'react-bootstrap';
import 'holderjs';

import Header from '../Header/Header';
import FriendListReducer from './FriendListReducer';
import './FriendList.scss';

const FriendList = () => {
    const initState = {
        isOpen: false,
        friends: {},
    };

    const [state, dispatch] = useReducer(FriendListReducer, initState);

    const handleNavbar = () => {
        if (state.isOpen) {
            dispatch({type: 'close'});
        } else {
            dispatch({type: 'open'});
        }
    };

    const getFriends = async () => {
        let res = await fetch(`${process.env.API_URL}/account/create/`))
    }

    return (
        <Col md="10" xs="12" className={`friend-list h-100 bg-dark ${state.isOpen ? 'open' : ''}`}>
            <Navbar bg="dark" variant="dark" className="justify-content-between align-items-center">
                <Navbar.Brand className="d-none d-sm-block">Friends</Navbar.Brand>
                <div className="mobile-menu d-block d-sm-none" onClick={handleNavbar}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                </div>
                <Header />
            </Navbar>
        </Col>
    );
};

export default FriendList;
