import React, {useEffect, useReducer} from 'react';
import {Modal, Button, Form, InputGroup} from 'react-bootstrap';
import {BsPencil} from 'react-icons/bs';
import Cookies from 'js-cookie';

import UserSettingsReducer from './UserSettingsReducer';

const UserSettings = (props) => {
    const initState = {
        detail: false,
        modify: false,
    };

    const [state, dispatch] = useReducer(UserSettingsReducer, initState);

    const getDetail = async () => {
        let res = await fetch(`${process.env.API_URL}/api/v1/account/me/detail/`, {
            headers: {Authorization: `Token ${Cookies.get('auth_token')}`},
        });

        if (res.ok) {
            let response = await res.json();
            dispatch({type: 'detail', detail: response});
        } else {
            let error = await res.json();
            console.log(error);
        }
    };

    useEffect(() => {
        getDetail();
    }, []);
    return (
        <Modal show={props.show} onHide={props.handleModal}>
            <Modal.Header closeButton>
                <Modal.Title>Settings</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group controlId="username">
                        <Form.Label>Usermame</Form.Label>
                        <InputGroup>
                            <Form.Control type="text" defaultValue={state.detail.username} readOnly />
                            <InputGroup.Append>
                                <Button variant="hidden" type="submit">
                                    <BsPencil />
                                </Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group controlId="email">
                        <Form.Label>Email address</Form.Label>
                        <InputGroup>
                            <Form.Control type="email" defaultValue={state.detail.email} readOnly />
                            <InputGroup.Append>
                                <Button variant="hidden" type="submit">
                                    <BsPencil />
                                </Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label>Current Password</Form.Label>
                        <Form.Control type="password" placeholder="Current password" />
                    </Form.Group>

                    <Form.Group controlId="new-password">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control type="password" placeholder="New password" />
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="hidden" onClick={props.handleModal}>
                    Close
                </Button>
                <Button variant="hidden" onClick={props.handleModal}>
                    Save changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UserSettings;
