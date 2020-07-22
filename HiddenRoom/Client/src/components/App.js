import React, {Fragment} from 'react';
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom';
import Login from './Login/Login';
import Header from './Header/Header';

const App = () => {
    return (
        <Fragment>
            <Header />
            <Router>
                <div>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/login">Login</Link>
                            </li>
                        </ul>
                    </nav>

                    <Switch>
                        <Route path="/login">
                            <Login />
                        </Route>
                    </Switch>
                </div>
            </Router>
        </Fragment>
    );
};

export default App;
