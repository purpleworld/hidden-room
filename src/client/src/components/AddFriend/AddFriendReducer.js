const AddFriendReducer = (state, action) => {
    switch (action.type) {
        case 'username': {
            return {
                ...state,
                username: action.username,
            };
        }
    }
};

export default AddFriendReducer;
