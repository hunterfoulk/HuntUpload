import React from "react";
import ReactPlayer from "react-player/lazy";
import { Link, useHistory } from "react-router-dom";

interface Props {
  videos: any;
}

const Profilevideos: React.FC<Props> = ({ videos }) => {
  const history = useHistory();

  return (
    <>
      {videos.map((video: any, i: number) => (
        <>
          <div
            key={i}
            onClick={async () => {
              history.push(`/video/${video.video_id}`);
            }}
            className="each-video-container"
          >
            <ReactPlayer width="350px" height="200px" url={video.link} />
            <span>{video.title}</span>
          </div>
        </>
      ))}
    </>
  );
};

export default Profilevideos;
