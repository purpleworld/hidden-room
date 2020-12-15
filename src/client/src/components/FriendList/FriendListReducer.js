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
        case 'get_friend':
            return {
                ...state,
                friends: [...state.friends, action.friends],
            };
    }
};

export default FriendListReducer;
