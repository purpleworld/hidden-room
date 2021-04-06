const FriendListReducer = (state, action) => {
    switch (action.type) {
        case 'isOpen':
            return {
                ...state,
                isOpen: state.isOpen ? false : true,
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
