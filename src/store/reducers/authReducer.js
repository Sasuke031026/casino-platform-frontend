import isEmpty from "../../validation/isEmpty";

const initialState = {
    isAuthenticated: false,
    user: {},
};

export default function authReduce(state = initialState, action) {
    switch (action.type) {
        case "SET_CURRENT_USER":
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload,
            };
        case "SET_SIGNER":
            return {
                ...state,
                signer: action.payload,
            };
        default:
            return state;
    }
}
