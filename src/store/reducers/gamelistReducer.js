const initialState = {
    gamelist: [],
};

export default function authReduce(state = initialState, action) {
    switch (action.type) {
        case "SET_CURRENT_GAMELIST":
            return {
                ...state,
                gamelist: action.payload,
            };
        default:
            return state;
    }
}
