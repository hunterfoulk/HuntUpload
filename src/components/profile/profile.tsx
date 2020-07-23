import React, { useState, useEffect } from "react";
import "./profile.scss";
import { useStateValue } from "../../state";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import Profilevideos from "../profile/profilevideos";
import Profileabout from "../profile/profileabout";
import Profilechannel from "../profile/profilechannels";

interface Props {
  OpenEditProfileFunc: () => void;
}

const Profile: React.FC<Props> = ({ OpenEditProfileFunc }) => {
  const [{ auth }, dispatch] = useStateValue();
  const [videos, setVideos] = useState<any>([]);
  const history = useHistory();
  const [tab, setTab] = useState("VIDEOS");

  const activeTabStyle = {
    borderBottom: "2px solid white",
    color: "white",
  };

  const GetVideos = async () => {
    let user_id = parseFloat(auth.user.user_id);
    const queryParams = { params: { user_id } };
    console.log("user id ", auth.user.user_id);
    axios
      .get(
        "http://localhost:9000/.netlify/functions/server/youtube/myvideos",
        queryParams
      )
      .then((res) => {
        console.log("data", res.data);

        setVideos(res.data);
      })
      .catch((error) => console.error("videos not fetched succesfully", error));
  };

  useEffect(() => {
    GetVideos();
  }, []);

  return (
    <>
      <div className="profile-container">
        <div className="profile-banner">
          <img src={auth.user.banner} />
        </div>
        <div className="profile-header">
          <div className="profile-header-left">
            <div className="profile-name-container">
              <img src={auth.user.pic} />
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
              <span
                style={tab === "VIDEOS" ? activeTabStyle : {}}
                onClick={() => setTab("VIDEOS")}
              >
                Videos
              </span>
              <span
                style={tab === "CHANNEL" ? activeTabStyle : {}}
                onClick={() => setTab("CHANNEL")}
              >
                Channels
              </span>
              <span
                style={tab === "ABOUT" ? activeTabStyle : {}}
                onClick={() => setTab("ABOUT")}
              >
                About
              </span>
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

        <div className="videos-container">
          {tab === "VIDEOS" && <Profilevideos videos={videos} />}
          {tab === "CHANNEL" && <Profilechannel />}
          {tab === "ABOUT" && <Profileabout />}
        </div>
      </div>
    </>
  );
};

export default Profile;
