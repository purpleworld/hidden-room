const ProfileReducer = (state, action) => {
    switch (action.type) {
        case 'modal':
            return {
                ...state,
                modal: action.modal,
            };
    }
};

export default ProfileReducer;
