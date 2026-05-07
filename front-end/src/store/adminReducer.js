const initialState = {
  token: "",
  customerId: "",
  mobile: "",
  error: "",
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN-ADMIN":
      return {
        ...state,
        token: action.token,
        mobile: action.mobile,
        adminId: action.adminId,
      };
    case "LOGIN_FAILED":
      return {
        ...state,
        error: action.error,
      };
    case "Admin-LogOut":
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

export default adminReducer;
