const ChatListReducer = (state, action) => {
    switch (action.type) {
        case 'get_rooms':
            return {
                ...state,
                rooms: action.rooms,
            };
    }
};

export default ChatListReducer;
