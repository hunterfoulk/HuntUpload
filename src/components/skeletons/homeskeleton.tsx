import React from "react";

interface Props {}

const Homeskeleton: React.FC<Props> = ({}) => {
  return (
    <>
      <div className="home-skeleton-main">
        <div className="home-skeleton-header"></div>
        <div className="home-video-skeletons-container">
          <div className="home-video-skeletons"></div>
          <div className="home-video-skeletons"></div>
          <div className="home-video-skeletons"></div>
          <div className="home-video-skeletons"></div>
        </div>
        <div className="home-video-skeletons-container">
          <div className="home-video-skeletons"></div>
          <div className="home-video-skeletons"></div>
          <div className="home-video-skeletons"></div>
          <div className="home-video-skeletons"></div>
        </div>
        <div className="home-video-skeletons-container">
          <div className="home-video-skeletons"></div>
          <div className="home-video-skeletons"></div>
          <div className="home-video-skeletons"></div>
          <div className="home-video-skeletons"></div>
        </div>
      </div>
    </>
  );
};

export default Homeskeleton;
