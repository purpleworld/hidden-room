const FriendListReducer = (state, action) => {
    switch (action.type) {
        case 'open':
            return {
                ...state,
                isOpen: true,
            };
        case 'close':
            return {
                ...state,
                isOpen: false,
            };
    }
};

export default FriendListReducer;
