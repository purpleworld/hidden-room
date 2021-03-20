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

        case 'messages':
            return {
                ...state,
                messages: state.messages.concat(action.messages),
            };
    }
};

export default ChatReducer;
