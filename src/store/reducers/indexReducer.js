const initialState = {
  isLog: false,
};

function indexReducer(state = initialState, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isLog: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        isLog: action.payload,
      };
    default:
      return state;
  }
}

export default indexReducer;
