import React, {useContext, useState, useEffect} from 'react';
import {Col, Media} from 'react-bootstrap';
import 'holderjs';

const ChatList = () => {
    return (
        <Col md="2" className="chat-list h-100">
            
            <ul className="list-unstyled">
                <Media as="li">
                    <img
                        width={64}
                        height={64}
                        className="mr-3"
                        src="holder.js/36x36"
                        alt="Generic placeholder"
                    />
                    <Media.Body>
                        <h6>Placeholder</h6>
                    </Media.Body>
                </Media>
                <Media as="li">
                    <img
                        width={64}
                        height={64}
                        className="mr-3"
                        src="holder.js/36x36"
                        alt="Generic placeholder"
                    />
                    <Media.Body>
                        <h6>Placeholder</h6>
                    </Media.Body>
                </Media>             <Media as="li">
                    <img
                        width={64}
                        height={64}
                        className="mr-3"
                        src="holder.js/36x36"
                        alt="Generic placeholder"
                    />
                    <Media.Body>
                        <h6>Placeholder</h6>
                    </Media.Body>
                </Media>
            </ul>
        </Col>
    );
};

export default ChatList;
