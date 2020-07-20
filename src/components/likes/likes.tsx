import React from "react";
import { useStateValue } from "../../state";
import "./likes.scss";

interface Props {}

const Likes: React.FC<Props> = ({}) => {
  const [{ auth }, dispatch] = useStateValue();

  return (
    <div className="likes-main">
      <div className="header-container">
        <h1>Liked Videos</h1>
      </div>
      <div className="likes-container">
        {auth.user.likes.map((video: any) => (
          <div className="likes">
            <div className="thumbnail-container">
              <video src={video.link} />
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
