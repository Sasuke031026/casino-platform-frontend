const initialState = {
  chatlist: {},
};

export default function chatlistReduce(state = initialState, action) {
  switch (action.type) {
    case "CHAT_LIST":
      return {
        chatlist: action.payload,
      };
    case "GET_CHAT_LIST":
      return {
        chatlist: action.payload,
      };
    default:
      return state;
  }
}
