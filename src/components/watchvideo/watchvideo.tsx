import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import ReactPlayer from "react-player/lazy";
import { BsPlayFill } from "react-icons/bs";
import { IoMdPause } from "react-icons/io";
import { AiFillLike } from "react-icons/ai";
import { BsFillVolumeUpFill } from "react-icons/bs";
import { AiFillDislike } from "react-icons/ai";
import { useStateValue } from "../../state";
import { Link, useHistory } from "react-router-dom";
import "./watchvideo.scss";
import Skeleton from "../skeletons/videoskeleton";

interface Props {
  allVideos: [];
  GetAllVideos: () => void;
  handleVideoRequest: (video_id: any) => void;
  video: any;
  handleLikeVideo: (video: any) => void;
  setIsLiked: setIsLiked;
  isLiked: boolean;
  videoIsLiked: () => void;
  handleDislike: (video: any) => void;
  isDisliked: boolean;
  handleSubscribe: (video: any) => void;
  isSubscribed: () => void;
  isSubbed: any;
}

interface Comment {
  name: string;
  pic: string;
  comment: string;
}

const Watchvideo: React.FC<Props> = ({
  allVideos,
  GetAllVideos,
  handleVideoRequest,
  video,
  handleLikeVideo,
  isLiked,
  setIsLiked,
  videoIsLiked,
  handleDislike,
  isDisliked,
  handleSubscribe,
  isSubscribed,
  isSubbed,
}) => {
  const history = useHistory();
  const [{ auth, components }, dispatch] = useStateValue();
  const [isPlaying, setPlaying] = useState(false);
  const [volume, setVolume] = useState(20);
  const [played, setPlayed] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const playerRef = useRef<any>(null);
  const [comment, setComment] = useState<Comment>({
    name: auth.user.name,
    pic: auth.user.pic,
    comment: "",
  });

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

  const SubmitNewComment = async (e: any, video: any, comment: {}) => {
    e.preventDefault();
    let video_id = parseInt(video.video_id);
    console.log("new comments", video_id);
    console.log(comment);

    const queryParams = { params: { video_id, comment } };

    await axios
      .get(
        "http://localhost:9000/.netlify/functions/server/youtube/updatecomments",
        queryParams
      )
      .then((res) => {
        console.log("new comment data", res.data);
        handleVideoRequest(video_id);
      })
      .catch((error) => console.error("post not updated succesfully", error));

    setComment({ name: auth.user.name, pic: auth.user.pic, comment: "" });
  };

  // CURRENT VIDEO REQUEST //
  useEffect(() => {
    console.log("fireddd");
    GetAllVideos();
    videoIsLiked();
    isSubscribed();
  }, [video]);

  const fullPath = window.location.pathname;
  const path_id = window.location.pathname.replace("/video/", "");
  useEffect(() => {
    console.log("FULL PATHNAME", window.location.pathname);
    console.log("PARSED PATH ID", path_id);
    handleVideoRequest(path_id);
  }, [fullPath]);

  if (components.isFetching) {
    return <Skeleton />;
  }

  return (
    <>
      <div className="video-page-container">
        <div className="video-page-left-container">
          <div className="preview-video-container">
            <ReactPlayer
              ref={playerRef}
              width="100%"
              height="100%"
              playing={isPlaying}
              volume={volume / 100}
              url={video.link}
              onProgress={handleProgress}
            />

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

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                    }}
                  >
                    <BsFillVolumeUpFill
                      style={{
                        color: "white",
                        position: "relative",
                        bottom: "1.5px",
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

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                    }}
                  >
                    <BsFillVolumeUpFill
                      style={{
                        color: "white",
                        position: "relative",
                        bottom: "1.5px",
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
          </div>
          <div className="video-header">
            <span className="video-title">{video.title}</span>
            <div className="video-views-container">
              <span>{video.views} views</span>
              <span>July 17,2020</span>
            </div>
            <div className="video-likes">
              <div style={{ marginRight: "15px" }}>
                <span>
                  {" "}
                  {isLiked ? (
                    <AiFillLike
                      onClick={() => handleLikeVideo(video)}
                      style={{
                        position: "relative",
                        top: "2",
                        marginRight: "5px",
                        color: "#3EA6FF",
                        cursor: "pointer",
                      }}
                    />
                  ) : (
                    <AiFillLike
                      onClick={() => handleLikeVideo(video)}
                      style={{
                        position: "relative",
                        top: "2",
                        marginRight: "5px",
                        color: "white",
                        cursor: "pointer",
                      }}
                    />
                  )}
                  {video.likes}
                </span>
              </div>
              <div>
                <span>
                  {isDisliked ? (
                    <AiFillDislike
                      onClick={() => handleDislike(video)}
                      style={{
                        position: "relative",
                        top: "3",
                        marginRight: "5px",
                        cursor: "pointer",
                        color: "#db4b4b",
                      }}
                    />
                  ) : (
                    <AiFillDislike
                      onClick={() => handleDislike(video)}
                      style={{
                        position: "relative",
                        top: "3",
                        marginRight: "5px",
                        cursor: "pointer",
                      }}
                    />
                  )}
                  {video.dislikes}
                </span>
              </div>
            </div>
          </div>
          <div className="video-description-container">
            <div className="video-uploader-container">
              <div style={{ display: "flex", alignItems: "center" }}>
                <img src={video.uploaderpic} />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {video.uploader}
                  <span style={{ fontSize: "12px" }}>0 subscribers</span>
                  {/* {video.subscribers} */}
                </div>
              </div>
              {isSubbed ? (
                <button
                  className="sub-button-subbed"
                  onClick={() => handleSubscribe(video)}
                >
                  Unsubscribe
                </button>
              ) : (
                <button
                  className="sub-button"
                  onClick={() => handleSubscribe(video)}
                >
                  Subscribe
                </button>
              )}
              {/* <button
                className="sub-button"
                onClick={() => handleSubscribe(video)}
              >
                Subscribe
              </button> */}
            </div>
            <div className="description-container">
              <p style={{ color: "white" }}>{video.description}</p>
            </div>
          </div>
          <div className="video-comments-main-container">
            <span
              style={{
                fontSize: "24",
                color: "white",
                marginTop: "10px",
                marginBottom: "10px",
              }}
            >
              Comments
            </span>
            <div className="comment-input-container">
              <img src={auth.user.pic} />
              <input
                value={comment.comment}
                onChange={(e) => {
                  setComment({ ...comment, comment: e.target.value });
                }}
                placeholder="Add a public comment..."
                className="comment-input"
              />
            </div>
            <div className="button-container">
              <button
                onClick={(e: any) => SubmitNewComment(e, video, comment)}
                type="submit"
              >
                Comment
              </button>
            </div>
            <div className="video-comments">
              {video.comments.map((comment: any) => (
                <div className="video-comment">
                  <img src={comment.pic} />
                  <div className="video-comment-text">
                    <span>{comment.name}</span>
                    <span>{comment.comment}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* RIGHT CONTAINER */}
        <div className="video-page-right-container">
          {allVideos.map((video: any) => (
            <div className="video-page-videos">
              <ReactPlayer
                onClick={async () => {
                  history.push(video.video_id);
                }}
                width="100%"
                height="100%"
                style={{ cursor: "pointer" }}
                url={video.link}
              />

              <div className="video-right-span-container">
                <span>{video.title}</span>
                <span>{video.uploader}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Watchvideo;
