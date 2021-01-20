import React, {useContext, useReducer, useEffect, Fragment} from 'react';
import {Col, Navbar, Nav} from 'react-bootstrap';
import Cookies from 'js-cookie';

import Card from '../Card/Card';
import AddFriend from '../AddFriend/AddFriend';
import FriendListReducer from './FriendListReducer';
import {useSwipeable} from 'react-swipeable';

const FriendList = () => {
    const initState = {
        isOpen: false,
        friends: [],
        pillsFriend: 'friends',
    };

    const [state, dispatch] = useReducer(FriendListReducer, initState);

    const handleSelect = (eventKey) => {
        dispatch({type: 'pills_friend', pillsFriend: eventKey});
        getFriends();
    };

    const handleNavbar = () => {
        if (state.isOpen) {
            dispatch({type: 'close'});
        } else {
            dispatch({type: 'open'});
        }
    };

    const getFriends = async () => {
        let res = await fetch(`${process.env.API_URL}/api/v1/account/friends/`, {
            headers: {Authorization: `Token ${Cookies.get('auth_token')}`},
        });
        if (res.ok) {
            let response = await res.json();
            dispatch({type: 'get_friend', friends: response});
        } else {
            let error = await res.json();
            console.log(error);
        }
    };

    const friends = state.friends.map((friend) => {
        if (state.pillsFriend.toUpperCase() == friend.relationship) {
            return <Card friend={friend} key={friend.id} getFriends={getFriends}></Card>;
        } else {
            return;
        }
    });

    useEffect(() => {
        getFriends();
    }, []);

    const handlers = useSwipeable({
        onSwipedLeft: () => {
            dispatch({type: 'close'});
        },
    });

    return (
        <Col md="10" xs="12" className={`friend-list h-100 bg-dark ${state.isOpen ? 'open' : ''}`} {...handlers}>
            <Navbar bg="dark" variant="dark" className="justify-content-between align-items-center">
                <Navbar.Brand className="d-none d-sm-block">Friends</Navbar.Brand>
                <Nav variant="pills" defaultActiveKey="friends" onSelect={handleSelect}>
                    <Nav.Item>
                        <Nav.Link eventKey="friends">Friends</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="pending">Pending</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="blocked">Blocked</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="add_friend">Add Friend</Nav.Link>
                    </Nav.Item>
                </Nav>
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
            </Navbar>
            <ul className="friends-list list-unstyled">
                {state.pillsFriend == 'add_friend' ? <AddFriend /> : friends}
            </ul>
        </Col>
    );
};

export default FriendList;
