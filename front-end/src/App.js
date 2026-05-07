import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import MainLayout from "./mainLayout";
import AdminLayout from "./adminLayout";
import { adminLogOut } from "./store/adminAction";
import { Logout } from "./store/action";

function App() {
  // const [confirmBoxMsg, setConfirmBoxMsg] = useState("");
  // const _isAdmin = useSelector((state) => state.reducer.isAdmin);
  // const [auth, setAuth] = useState(false);

  const [adminSideUrl, setAdminSideUrl] = useState(false);
  const [clientSideUrl, setClientSideUrl] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (adminSideUrl) {
      navigate("/admin/login", { replace: true });
      dispatch(adminLogOut());
    }
    return () => {
      setAdminSideUrl(false);
    };
  }, [adminSideUrl]);

  useEffect(() => {
    if (clientSideUrl) {
      navigate("/", { replace: true });
      dispatch(Logout());
    }
    return () => {
      setClientSideUrl(false);
    };
  }, [clientSideUrl]);

  const constantMock = window.fetch;
  window.fetch = function () {
    let response;

    return new Promise((resolve, reject) => {
      constantMock
        .apply(this, arguments)
        .then((response) => {
          //for admin-side urls
          if (response.status === 401 && response.url.indexOf("admin") > -1) {
            return setAdminSideUrl(true);
          }
          if (response.status === 401 && response.url.indexOf("admin") === -1) {
            return setClientSideUrl(true);
          }

          return resolve(response);
        })
        .catch((error) => {
          // console.log(error);
          reject(response);
        });
    });
  };

  return (
    <Routes>
      <Route
        path="/admin/*"
        element={<AdminLayout render={(props) => ({ ...props })} />}
      />
      <Route
        exact
        path="/*"
        element={<MainLayout render={(props) => ({ ...props })} />}
      />
    </Routes>
  );
}

export default App;
