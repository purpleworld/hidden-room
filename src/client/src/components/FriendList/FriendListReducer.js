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
                friends: action.friends,
            };

        case 'pills_friend':
            return {
                ...state,
                pillsFriend: action.pillsFriend,
            };
    }
};

export default FriendListReducer;
