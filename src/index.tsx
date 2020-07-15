import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { StateProvider } from "./state";

const initialState = {
  auth: {
    isAuthenticated: false,
    token: "",
    user: {},
  },
};
const user = localStorage.getItem("user");
const token = localStorage.getItem("token");

if (user) {
  initialState.auth.isAuthenticated = true;
  initialState.auth.user = JSON.parse(user);
  initialState.auth.token = JSON.stringify(token);
}

console.log("this is index", initialState.auth.user);

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "login":
      return {
        ...state,
        auth: action.auth,
      };
    case "logout":
      return {
        ...state,
        auth: {
          isAuthenticated: false,
          user: {},
        },
      };
    case "update":
      return {
        ...state,
        auth: action.auth,
      };
    default:
      return state;
  }
};

ReactDOM.render(
  <StateProvider initialState={initialState} reducer={reducer}>
    <App />
  </StateProvider>,
  document.getElementById("root")
);
