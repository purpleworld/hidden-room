import React, {useContext} from 'react';
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom';
import Login from './Login/Login';
import Register from './Register/Register';
import UserContext from '../contexts/UserContext';

const App = () => {
    const user = useContext(UserContext);

    return (
        <Router>
            <Switch>
                <Route path="/login" component={Login}></Route>
                <Route path="/register" component={Register}></Route>
                <Route path="/">{user.isLogged ? <div>Home</div> : <Redirect to="/login" />}</Route>
            </Switch>
        </Router>
    );
};

export default App;
