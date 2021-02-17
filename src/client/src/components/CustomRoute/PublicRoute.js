import React from 'react';
import {Route, Redirect, useParams} from 'react-router-dom';
import Cookies from 'js-cookie';

const PublicRoute = ({component: Component, restricted, ...rest}) => {
    return (
        <Route
            {...rest}
            render={(props) =>
                Cookies.get('auth_token') && restricted ? <Redirect to="/app/me" /> : <Component {...props} />
            }
        />
    );
};

export default PublicRoute;
