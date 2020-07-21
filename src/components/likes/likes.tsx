import React from "react";
import { useStateValue } from "../../state";
import { Link, useHistory } from "react-router-dom";
import "./likes.scss";

interface Props {
  setVideoContent: setVideoContent;
}

const Likes: React.FC<Props> = ({ setVideoContent }) => {
  const [{ auth }, dispatch] = useStateValue();
  const history = useHistory();

  return (
    <div className="likes-main">
      <div className="header-container">
        <h1>Liked Videos</h1>
      </div>
      <div className="likes-container">
        {auth.user.likes.map((video: any) => (
          <div className="likes">
            <div className="thumbnail-container">
              <video
                onClick={async () => {
                  setVideoContent(video.video_id);
                  setTimeout(function () {
                    history.push("/video");
                  }, 600);
                }}
                src={video.link}
              />
            </div>
            <div className="video-text-container">
              <span style={{ color: "white", fontSize: "23px" }}>
                {video.title}
              </span>
              <span className="uploader-text">{video.uploader}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Likes;
