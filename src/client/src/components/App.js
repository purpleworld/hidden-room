import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import PrivateRoute from './CustomRoute/PrivateRoute';
import PublicRoute from './CustomRoute/PublicRoute';
import Login from './Login/Login';
import Register from './Register/Register';
import Home from './Home/Home';
import UserContext from '../contexts/UserContext';
import Cookies from 'js-cookie';

const App = () => {
    const [user, setUser] = useState({});

    const getUserDetail = async () => {
        let res = await fetch(`${process.env.API_URL}/api/account/me/`, {
            headers: {Authorization: `Token ${Cookies.get('auth_token')}`},
            method: 'GET',
        });

        if (res.ok) {
            let response = await res.json();
            setUser(response);
        } else {
            let error = await res.json();
            console.log(error);
        }
    };

    useEffect(() => {
        getUserDetail();
    }, []);

    return (
        <UserContext.Provider value={{user: user, getUserDetail: getUserDetail}}>
            <Router>
                <Switch>
                    <PublicRoute restricted="false" path="/login" component={Login} />
                    <PublicRoute restricted="false" path="/register" component={Register}></PublicRoute>
                    <PrivateRoute restricted="true" path="/" component={Home} />
                </Switch>
            </Router>
        </UserContext.Provider>
    );
};

export default App;
