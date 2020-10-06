import React, {useContext} from 'react';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';

import UserContext from '../../contexts/UserContext';

const Header = () => {
    const user = useContext(UserContext);
    const profile = user.user;

    return (
        <Navbar bg="dark" variant="dark" className="justify-content-between">
            <Navbar.Brand>Hidden Room</Navbar.Brand>
            <Nav>
                <a>{profile.username}</a>
            </Nav>
        </Navbar>
    );
};

export default Header;
