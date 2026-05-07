export const loginRequest = (mobile, token, customerId) => {
  return {
    type: "LOGIN",
    mobile: mobile,
    token: token,
    customerId: customerId,
  };
};

export const loginFailed = (err) => {
  return {
    type: "LOGIN_FAILED",
    error: err,
  };
};

export const login = (mobile) => {
  return (dispatch) => {
    return fetch(`${process.env.REACT_APP_URL}/customer/logIn`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mobile,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((res) => {
            return dispatch(loginFailed(res.message));
          });
        } else {
          return response.json();
        }
      })
      .then((res) => {
        return dispatch(loginRequest(res.mobile, res.token, res.customerId));
      })
      .catch((e) => {
        console.log(e);
      });
  };
};

export const Logout = () => {
  return {
    type: "LOGOUT",
  };
};
