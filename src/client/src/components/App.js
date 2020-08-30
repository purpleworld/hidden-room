import React, {useContext, useState, useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom';
import Login from './Login/Login';
import Register from './Register/Register';
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
                    <Route path="/login" component={Login}></Route>
                    <Route path="/register" component={Register}></Route>
                    <Route path="/">
                        <UserContext.Consumer>
                            {(context) => {
                                console.log(context);
                                if (!context['user']['username']) {
                                    return <Redirect to="/login" />;
                                } else {
                                    return <div>Home</div>;
                                }
                            }}
                        </UserContext.Consumer>
                    </Route>
                </Switch>
            </Router>
        </UserContext.Provider>
    );
};

export default App;
