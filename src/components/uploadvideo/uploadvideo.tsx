import React, { useState, useRef } from "react";
import "./uploadvideo.scss";
import { FiUpload } from "react-icons/fi";
import { BsPlayFill } from "react-icons/bs";
import { IoMdPause } from "react-icons/io";
import { BsFillVolumeUpFill } from "react-icons/bs";
import ReactPlayer from "react-player/lazy";
import useInput from "../../hooks/useInput";
import { useStateValue } from "../../state";
import axios from "axios";

interface Props {}

const UploadVideo: React.FC<Props> = ({}) => {
  const [{ auth }, dispatch] = useStateValue();
  const [video, setVideo] = useState<any>("");
  const [videoFile, setVideoFile] = useState<any>("");
  const [isPlaying, setPlaying] = useState(false);
  const [volume, setVolume] = useState(20);
  const [played, setPlayed] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const playerRef = useRef<any>(null);
  const title = useInput("");
  const description = useInput("");

  const SelectVideoHandler = async (e: any) => {
    let reader = new FileReader();
    const file = e.target.files[0];

    if (file) {
      console.log("this is the video", e.target.value);

      reader.onloadend = () => {
        setVideo(reader.result);
        setVideoFile(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const HandlePlay = () => {
    setPlaying(!isPlaying);
    console.log("playing", isPlaying);
  };

  const handleSeekChange = (e: any) => {
    setPlayed(parseFloat(e.target.value));
    console.log(played);
  };
  console.log(played);

  const handleProgress = (state: any) => {
    if (!seeking) {
      setPlayed(state.played);
    }
  };

  const handleSeekMouseDown = (e: any) => {
    setSeeking(true);
  };
  const handleMouseUp = (e: any) => {
    setSeeking(false);
    playerRef.current.seekTo(parseFloat(e.target.value));
  };

  const HandleVideoUpload = async (e: any) => {
    e.preventDefault();
    let user_id = auth.user.user_id;
    let uploader = auth.user.name;
    let uploaderPic = auth.user.pic;

    let formData = new FormData();

    formData.append("user_id", user_id);
    formData.append("uploader", uploader);
    formData.append("uploaderPic", uploaderPic);
    formData.append("videoFile", videoFile);
    formData.append("title", title.value);
    formData.append("description", description.value);

    let headers = {
      "Content-Type": "multipart/form-data",
    };

    await axios
      .post(
        "http://localhost:9000/.netlify/functions/server/youtube/upload",
        formData,
        {
          headers: headers,
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log("response", res);
        console.log("new video uploaded to database");
      })
      .catch((error) => {
        console.error("error", error);
      });
  };

  return (
    <>
      <div className="upload-video-modal">
        <div className="upload-header">
          <label htmlFor="select-video">
            <div className="select-button">Choose Video</div>
          </label>
          <input
            id="select-video"
            type="file"
            accept="video/quicktime,video/mov, video/3g2, video/3gp, video/3gp2, video/3gpp, video/asf, video/asx, video/avi, video/divx, video/m4v,  video/mp4, video/mpe, video/x-m4v, video/mpeg, video/mpg, video/ogg, video/wmv"
            onChange={SelectVideoHandler}
            style={{ display: "none" }}
          />
          <button onClick={HandleVideoUpload}>
            Upload <FiUpload style={{ position: "relative", top: "2px" }} />
          </button>
        </div>
        <div className="preview-container">
          {video ? (
            <>
              <span style={{ color: "white" }}>Title</span>
              <input
                value={title.value}
                onChange={title.onChange}
                type="text"
              />
              <span style={{ color: "white" }}>Description</span>
              <textarea
                value={description.value}
                onChange={description.onChange}
              />
            </>
          ) : null}
          <div className="preview-video-container">
            {video ? null : <span>No Video Chosen</span>}

            <ReactPlayer
              ref={playerRef}
              stlye={{ width: "100%", zIndex: "300" }}
              playing={isPlaying}
              volume={volume / 100}
              url={video}
              onProgress={handleProgress}
            />
          </div>

          {(() => {
            if (video) {
              return (
                <div className="preview-player">
                  {isPlaying ? (
                    <>
                      <IoMdPause
                        onClick={HandlePlay}
                        style={{
                          fontSize: "25px",
                          cursor: "pointer",
                          color: "white",
                        }}
                      />
                      {/* time slider */}
                      <input
                        className="range-slider-seek"
                        type="range"
                        min={0}
                        max={1}
                        step="any"
                        value={played}
                        onMouseDown={handleSeekMouseDown}
                        onChange={handleSeekChange}
                        onMouseUp={handleMouseUp}
                      />

                      <div>
                        <BsFillVolumeUpFill
                          style={{
                            color: "white",
                            position: "relative",
                            top: "4.3px",
                          }}
                        />
                        {/* volume slider */}
                        <input
                          type="range"
                          className="range-slider"
                          value={volume}
                          onChange={(e: any) => setVolume(e.target.value)}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <BsPlayFill
                        onClick={HandlePlay}
                        style={{
                          fontSize: "25px",
                          cursor: "pointer",
                          color: "white",
                        }}
                      />
                      {/* time slider */}
                      <input
                        className="range-slider-seek"
                        type="range"
                        min={0}
                        max={1}
                        step="any"
                        value={played}
                        onMouseDown={handleSeekMouseDown}
                        onChange={handleSeekChange}
                        onMouseUp={handleMouseUp}
                      />

                      <div>
                        <BsFillVolumeUpFill
                          style={{
                            color: "white",
                            position: "relative",
                            top: "4.3px",
                          }}
                        />
                        {/* volume slider */}
                        <input
                          type="range"
                          className="range-slider"
                          value={volume}
                          onChange={(e: any) => setVolume(e.target.value)}
                        />
                      </div>
                    </>
                  )}
                </div>
              );
            } else if (!video) {
              return <></>;
            }
          })()}
        </div>
      </div>
    </>
  );
};

export default UploadVideo;
