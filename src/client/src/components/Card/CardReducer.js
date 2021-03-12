const CardReducer = (state, action) => {
    switch (action.type) {
        case 'profile':
            return {
                ...state,
                profile: action.profile,
            };
    }
};

export default CardReducer;
