import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import Cookies from 'js-cookie';
import PropTypes from 'prop-types';

const PrivateRoute = ({component: Component, ...rest}) => {
    return (
        <Route
            {...rest}
            render={(props) => (Cookies.get('auth_token') ? <Component {...props} /> : <Redirect to="/login" />)}
        />
    );
};

PrivateRoute.propTypes = {
    component: PropTypes.func,
    restricted: PropTypes.string,
};

export default PrivateRoute;
