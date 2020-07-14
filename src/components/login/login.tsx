import React, { useState } from "react";
import "./login.scss";
import { Link, useHistory } from "react-router-dom";
import { AiFillYoutube } from "react-icons/ai";
import useInput from "../../hooks/useInput";
import { useStateValue } from "../../state";
import axios from "axios";

interface Props {}

const Login: React.FC<Props> = ({}) => {
  const history = useHistory();
  const email = useInput("");
  const password = useInput("");
  const [{ auth }, dispatch] = useStateValue();

  const handleLogin = async (e: any) => {
    e.preventDefault();

    const payload = {
      email: email.value,
      password: password.value,
    };

    await axios
      .post(
        "http://localhost:9000/.netlify/functions/server/youtube/login",
        payload
      )
      .then((res) => {
        const user = res.data.payload;
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(user));

        console.log("logged in succesfully");
        console.log("response", res);
        console.log("user", user);

        dispatch({
          type: "login",
          auth: {
            isAuthenticated: true,
            token: res.data.token,
            user: user,
          },
        });

        history.push("/");
      })
      .catch((error) => {
        console.error("error", error);
      });

    email.setValue("");
    password.setValue("");
  };

  return (
    <>
      <div className="login-main">
        <div className="login-container">
          <div className="login-header">
            <span>You</span>
            <span style={{ color: "#E53B38" }}>Tube</span>
            <AiFillYoutube
              style={{ color: "#E53B38", position: "relative", top: "8px" }}
            />
          </div>
          <span
            style={{
              width: "55%",
              display: "flex",
              justifyContent: "center",
              color: "white",
              fontSize: "22px",
              marginBottom: "30px",
            }}
          >
            Sign in
          </span>
          <form onSubmit={(e: any) => handleLogin(e)}>
            <div className="input-container">
              <span>Email</span>
              <input
                value={email.value}
                onChange={email.onChange}
                type="text"
              />
            </div>
            <div className="input-container">
              <span>Password</span>
              <input
                value={password.value}
                onChange={password.onChange}
                type="text"
              />
            </div>
            <button onClick={(e: any) => handleLogin(e)} type="submit">
              Sign in
            </button>
            <span
              onClick={() => history.push("/register")}
              className="signup-link"
              style={{ position: "relative", top: "40px" }}
            >
              Dont have an account? Sign up here
            </span>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
