import React, { useState, useEffect } from "react";
import "./profile.scss";
import { useStateValue } from "../../state";
import axios from "axios";
import ReactPlayer from "react-player/lazy";
import { Link, useHistory } from "react-router-dom";

interface Props {
  OpenEditProfileFunc: () => void;
  setVideoContent: setVideoContent;
}

const Profile: React.FC<Props> = ({ OpenEditProfileFunc, setVideoContent }) => {
  const [{ auth }, dispatch] = useStateValue();
  const [videos, setVideos] = useState<any>([]);
  const history = useHistory();

  const GetVideos = async () => {
    let user_id = parseFloat(auth.user.user_id);
    const queryParams = { params: { user_id } };

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

  // const WatchVideo = (video: any) => {
  //   console.log("video id ", video);
  // };

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
                <span style={{ fontSize: "14px" }}>{auth.user.about}</span>
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

        <div className="videos-container">
          {videos.map((video: any, i: number) => (
            <>
              <div
                key={i}
                onClick={async () => {
                  setVideoContent(video.video_id);
                  setTimeout(function () {
                    history.push("/video");
                  }, 500);
                }}
                className="each-video-container"
              >
                <ReactPlayer width="350px" height="200px" url={video.link} />
                <span>{video.title}</span>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default Profile;
