const ChatReducer = (state, action) => {
    switch (action.type) {
        case 'get_room':
            return {
                ...state,
                room: action.room,
            };

        case 'message':
            return {
                ...state,
                message: action.message,
            };
    }
};

export default ChatReducer;
