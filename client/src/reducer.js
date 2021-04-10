function reducer(state, action) {
    switch (action.type) {
        case 'JOIN_ROOM':
            return {
                ...state,
                joined: true,
                roomId: action.payload.roomId,
                userName: action.payload.userName
            };
        case 'SET_USERS':
            return {
                ...state,
                users: action.payload,
            };
        case 'ADD_MESSAGE':
            return {
                ...state,
                messages: [...state.messages, action.payload]
            };
        default:
            return state;
    }
}

export default reducer;