const initialState = {
  token: "",
  customerId: "",
  mobile: "",
  error: "",
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        token: action.token,
        mobile: action.mobile,
        customerId: action.customerId,
      };

    case "LOGIN_FAILED":
      return {
        ...state,
        error: action.error,
      };
    case "LOGOUT":
      return {
        customerId: "",
        mobile: "",
        token: "",
        error: "",
      };

    default:
      return state;
  }
};

export default Reducer;
