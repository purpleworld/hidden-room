import React from 'react';
import {Container, Form, Button, Row, Col} from 'react-bootstrap';

const Register = () => {
    return (
        <Container className="d-flex justify-content-center align-items-center h-100" fluid>
            <Row>
                <Col className="text-center main-title">
                    <h1>Hidden Room</h1>
                    <h2>Create an account</h2>
                    <Form className="text-left">
                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" required />
                        </Form.Group>

                        <Form.Group controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="username" required />
                        </Form.Group>

                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" required />
                        </Form.Group>

                        <Form.Group controlId="confirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="confirmPassword" required />
                        </Form.Group>

                        <Button variant="hidden" type="submit">
                            Register
                        </Button>
                        <p className="mt-2">
                            Already have an account?
                            <span>
                                <a href="/login"> Login</a>
                            </span>
                        </p>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Register;
