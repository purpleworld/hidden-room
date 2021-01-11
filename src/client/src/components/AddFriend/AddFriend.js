import React, {useContext, useReducer, useEffect, Fragment} from 'react';
import {Form, InputGroup, Button} from 'react-bootstrap';

const AddFriend = () => {
    return (
        <Form>
            <Form.Label>You can add a friend with their username</Form.Label>
            <InputGroup>
                <Form.Control type="text" placeholder="Username" />
                <InputGroup.Append>
                    <Button variant="hidden">Send request</Button>
                </InputGroup.Append>
            </InputGroup>
        </Form>
    );
};

export default AddFriend;
