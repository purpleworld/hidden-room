import React, {useReducer, useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom';
import {Container, Form, Button, Row, Col} from 'react-bootstrap';
import RegisterReducer from './RegisterReducer';

const Register = () => {
    const initState = {
        email: '',
        username: '',
        password: '',
        confirm_password: '',
    };

    const [state, dispatch] = useReducer(RegisterReducer, initState);

    const onSubmit = async (e) => {
        e.preventDefault();

        const formdata = new FormData();
        formdata.append('username', state.username);
        formdata.append('password', state.password);
        formdata.append('confirm_password', state.confirm_password);
        formdata.append('email', state.email);

        let res = await fetch(`${process.env.API_URL}/account/create/`, {
            body: formdata,
            method: 'POST',
        });

        if (res.ok) {
            console.log('Registered');
        } else {
            let error = await res.json();
            console.log(error);
        }
    };

    useEffect(() => {
        document.title = 'Register / Hidden Room';
    }, []);

    return (
        <Container className="d-flex justify-content-center align-items-center h-100" fluid>
            <Row>
                <Col className="text-center main-title">
                    <h1>Hidden Room</h1>
                    <h2>Create an account</h2>
                    <Form className="text-left" onSubmit={onSubmit}>
                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                onChange={(e) =>
                                    dispatch({type: 'change', field: 'email', payload: e.currentTarget.value})
                                }
                                type="email"
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                onChange={(e) =>
                                    dispatch({type: 'change', field: 'username', payload: e.currentTarget.value})
                                }
                                type="username"
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                onChange={(e) =>
                                    dispatch({type: 'change', field: 'password', payload: e.currentTarget.value})
                                }
                                type="password"
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="confirm_password">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                onChange={(e) =>
                                    dispatch({
                                        type: 'change',
                                        field: 'confirm_password',
                                        payload: e.currentTarget.value,
                                    })
                                }
                                type="password"
                                required
                            />
                        </Form.Group>

                        <Button variant="hidden" type="submit">
                            Register
                        </Button>
                        <p className="mt-2">
                            Already have an account?
                            <span>
                                <Link to="/login"> Login</Link>
                            </span>
                        </p>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Register;
