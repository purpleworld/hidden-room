const ChatReducer = (state, action) => {
    switch (action.type) {
        case 'get_room':
            return {
                ...state,
                room: action.room,
            };
    }
};

export default ChatReducer;
