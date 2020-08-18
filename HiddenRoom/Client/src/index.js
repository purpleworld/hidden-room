import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

import App from './components/App';
import UserContext from './contexts/UserContext';
import './components/App.scss';

render(
    <Router>
        <UserContext.Provider value={{user: {}, isLogged: false}}>
            <App />
        </UserContext.Provider>
    </Router>,
    document.getElementById('root')
);
