import React from "react";
import { useStateValue } from "../../state";
import { Link, useHistory } from "react-router-dom";
import "./likes.scss";

interface Props {}

const Likes: React.FC<Props> = ({}) => {
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
                key={video.video_id}
                onClick={async () => {
                  history.push(`video/${video.video_id}`);
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
