import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import Cookies from 'js-cookie';

const PublicRoute = ({component: Component, restricted, ...rest}) => {
    return (
        <Route
            {...rest}
            render={(props) =>
                Cookies.get('auth_token') && restricted ? <Redirect to="/" /> : <Component {...props} />
            }
        />
    );
};

export default PublicRoute;
