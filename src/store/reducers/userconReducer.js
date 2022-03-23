const initialState = {
    user_con: 0,
};

export default function userReduce(state = initialState, action) {
    switch (action.type) {
        case "USER_CONNECTION":
            return {
                ...state,
                user_con: action.payload,
            };
        default:
            return state;
    }
}
