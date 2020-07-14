import React from "react";
import "./signup.scss";
import { AiFillYoutube } from "react-icons/ai";
import { Link, useHistory } from "react-router-dom";
import useInput from "../../hooks/useInput";
import axios from "axios";
import Defaultpic from "../../images/default.png";

interface Props {}

const Signup: React.FC<Props> = ({}) => {
  const history = useHistory();
  const email = useInput("");
  const name = useInput("");
  const password = useInput("");

  const handleSignup = async (e: any) => {
    e.preventDefault();

    console.log("values", email.value, password.value);

    const payload = {
      email: email.value,
      name: name.value,
      password: password.value,
    };

    await axios
      .post(
        "http://localhost:9000/.netlify/functions/server/youtube/register",
        payload
      )
      .then((res) => {
        console.log("respone", res);
        console.log("signup sent to database");
      })
      .catch((error) => {
        console.error("error", error);
      });

    console.log("payload", payload);
    email.setValue("");
    password.setValue("");
  };

  return (
    <>
      {" "}
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
              width: "100%",
              display: "flex",
              justifyContent: "center",
              color: "white",
              fontSize: "22px",
              marginBottom: "50px",
            }}
          >
            Register your account.
          </span>
          <form onSubmit={(e) => handleSignup(e)}>
            <div className="input-container">
              <span>Email</span>
              <input
                type="text"
                value={email.value}
                onChange={email.onChange}
              />
            </div>
            <div className="input-container">
              <span>Name</span>
              <input type="text" value={name.value} onChange={name.onChange} />
            </div>
            <div className="input-container">
              <span>Password</span>
              <input
                value={password.value}
                onChange={password.onChange}
                type="text"
              />
            </div>
            <button onClick={(e) => handleSignup(e)} type="submit">
              Sign up
            </button>
            <span
              onClick={() => history.push("/login")}
              className="signup-link"
              style={{ position: "relative", top: "40px" }}
            >
              Already have an account? Log in here
            </span>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
