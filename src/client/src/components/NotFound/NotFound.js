import React from 'react';
import {Link} from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="not-found">
            <div>Sorry, this page does not exist!</div>
            <Link to="/">Go to the app</Link>
        </div>
    );
};

export default NotFound;
