const LoginReducer = (state, action) => {
    switch (action.type) {
        case 'change': {
            return {
                ...state,
                [action.field]: action.payload,
            };
        }
    }
};

export default LoginReducer;
