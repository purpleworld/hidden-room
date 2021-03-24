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
                messages: action.messages,
            };

        case 'scroll':
            return {
                ...state,
                scroll: action.scroll,
            };

        case 'next':
            return {
                ...state,
                next: action.next,
            };
    }
};

export default ChatReducer;
