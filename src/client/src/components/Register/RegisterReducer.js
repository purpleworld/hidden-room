const RegisterReducer = (state, action) => {
    switch (action.type) {
        case 'change': {
            return {
                ...state,
                [action.field]: action.payload,
            };
        }
    }
};

export default RegisterReducer;
