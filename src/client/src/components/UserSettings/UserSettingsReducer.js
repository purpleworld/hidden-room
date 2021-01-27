const UserSettingsReducer = (state, action) => {
    switch (action.type) {
        case 'detail':
            return {
                ...state,
                detail: action.detail,
            };
    }
};

export default UserSettingsReducer;
