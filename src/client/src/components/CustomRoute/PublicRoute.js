import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import Cookies from 'js-cookie';
import PropTypes from 'prop-types';

const PublicRoute = ({component: Component, restricted, ...rest}) => {
    return (
        <Route
            {...rest}
            render={(props) =>
                Cookies.get('auth_token') && restricted ? <Redirect to="/app/room/me" /> : <Component {...props} />
            }
        />
    );
};

PublicRoute.propTypes = {
    component: PropTypes.func,
    restricted: PropTypes.string,
};

export default PublicRoute;
