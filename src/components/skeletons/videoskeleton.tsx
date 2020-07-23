import React from "react";
import "./skeletons.scss";

interface Props {}

const VideoSkeleton: React.FC<Props> = ({}) => {
  return (
    <>
      <div className="video-skeleton-main">
        <div className="video-left">
          <div className="video-container">
            <div className="video-skeleton"></div>
          </div>
          <div className="video-title-skeleton">
            <div className="title"></div>
            <div className="description"></div>
          </div>
          <div className="uploader-skeleton">
            <div style={{ marginLeft: "60px", display: "flex" }}>
              <div className="pic"></div>
              <div className="uploader"></div>
            </div>
          </div>
        </div>
        <div className="video-right">
          <div className="video-right-videos"></div>
          <div className="video-right-videos"></div>
          <div className="video-right-videos"></div>
          <div className="video-right-videos"></div>
          <div className="video-right-videos"></div>
        </div>
      </div>
    </>
  );
};

export default VideoSkeleton;
