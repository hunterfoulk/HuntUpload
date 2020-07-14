import React, { useState } from "react";
import "./profile.scss";
import Banner from "../../images/bannertest.jpg";
import { useStateValue } from "../../state";

interface Props {
  OpenEditProfileFunc: () => void;
}

const Profile: React.FC<Props> = ({ OpenEditProfileFunc }) => {
  const [{ auth }, dispatch] = useStateValue();

  return (
    <>
      <div className="profile-container">
        <div className="profile-banner">
          <img src={auth.user.banner} />
        </div>
        <div className="profile-header">
          <div className="profile-header-left">
            <div className="profile-name-container">
              <img src={auth.user.img} />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <span>{auth.user.name}</span>
                <span
                  style={{
                    fontSize: "15px",
                  }}
                >
                  {" "}
                  Subscribers:{" "}
                  <span
                    style={{
                      position: "relative",
                      top: "1px",
                      fontSize: "15px",
                    }}
                  >
                    {auth.user.subcount}
                  </span>
                </span>
              </div>
            </div>
            <div className="profile-header-left-links">
              <span>Videos</span>
              <span>Subscribers</span>
              <span>About</span>
            </div>
          </div>
          <div className="profile-header-right">
            <div className="header-button-container">
              <button onClick={() => OpenEditProfileFunc()}>
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
