import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import "./assets/fonts/IRANSansWeb.ttf";

import App from "./App";

import {  BrowserRouter } from "react-router-dom";

import { configureStore } from "@reduxjs/toolkit";
import Reducer from "./store/reducer";
import AdminReducer from "./store/adminReducer";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import { PersistGate } from "redux-persist/integration/react";

import { combineReducers } from "redux";
import { Provider } from "react-redux";

const persistConfig = {
  key: "root",
  storage,
};
const rootReducer = combineReducers({
  reducer: Reducer,
  adminReducer: AdminReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

const persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </BrowserRouter>
  </Provider>
);
