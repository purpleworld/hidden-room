const UserSettingsReducer = (state, action) => {
    switch (action.type) {
        case 'detail':
            return {
                ...state,
                detail: action.detail,
            };

        case 'modify':
            return {
                ...state,
                modify: action.modify,
            };

        case 'change': {
            return {
                ...state,
                [action.field]: action.payload,
            };
        }
    }
};

export default UserSettingsReducer;
