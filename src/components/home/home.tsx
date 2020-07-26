import React, { useEffect } from "react";
import "./home.scss";
import { Link, useHistory } from "react-router-dom";

interface Props {
  GetAllVideos: () => void;
  allVideos: any;
}

const Home: React.FC<Props> = ({ GetAllVideos, allVideos }) => {
  const history = useHistory();

  useEffect(() => {
    GetAllVideos();
  }, []);

  return (
    <>
      <div className="main-container">
        <div className="header-container">
          <h1>Recommended</h1>
        </div>
        <div className="home-videos-container">
          {allVideos.map((video: any) => (
            <>
              <div className="video">
                <div className="thumbnail-container">
                  <video
                    className="thumbnail"
                    src={video.link}
                    onClick={async () => {
                      history.push(`video/${video.video_id}`);
                    }}
                  />
                </div>
                <div className="title-container">
                  <span className="title">{video.title}</span>
                  <span className="uploader">{video.uploader}</span>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
