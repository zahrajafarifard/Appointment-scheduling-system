// export const loginAdminRequest = (mobile, token, adminId, expTime) => {
export const loginAdminRequest = (mobile, token, adminId) => {
  return {
    type: "LOGIN-ADMIN",
    mobile: mobile,
    token: token,
    adminId: adminId,
    // expirationTime: expTime,
  };
};

export const loginFailed = (err) => {
  return {
    type: "LOGIN_FAILED",
    error: err,
  };
};

export const loginAdmin = (mobile, password) => {
  return async (dispatch) => {
    const response = await fetch(`${process.env.REACT_APP_URL}/admin/signIn`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mobile,
        password,
      }),
    });

    const res = await response.json();

    if (response.status === 403) {
      return dispatch(loginFailed(res.msg));
    }
    if (response.status === 401) {
      return dispatch(adminLogOut());
    }
    if (response.status === 422) {
      return dispatch(loginFailed(res.msg));
    }
    if (!response.ok) {
      return dispatch(loginFailed(res.message));
    }

    // const expirationTime = new Date(new Date().getTime() + 3600000);

    console.log("res addddmin", res.mobile, res.token, res.adminId);
    return dispatch(
      // loginAdminRequest(res.mobile, res.token, res.adminId, expirationTime)
      loginAdminRequest(res.mobile, res.token, res.adminId)
    );
  };
};

export const adminLogOut = () => {
  return {
    type: "Admin-LogOut",
  };
};
