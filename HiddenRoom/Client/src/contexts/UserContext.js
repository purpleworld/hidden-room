import React, {createContext} from 'react';

const UserContext = createContext({
    user: {},
    isLogged: false,
});

UserContext.displayName = 'UserContext';

export default UserContext;
