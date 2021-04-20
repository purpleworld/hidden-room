const RegisterReducer = (state, action) => {
    switch (action.type) {
        case 'change': {
            return {
                ...state,
                [action.field]: action.payload,
            };
        }

        case 'error': {
            return {
                ...state,
                error: {...state.error, [action.errorType]: action.error},
            };
        }
    }
};

export default RegisterReducer;
