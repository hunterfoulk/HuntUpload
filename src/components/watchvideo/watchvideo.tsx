import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import ReactPlayer from "react-player/lazy";
import { BsPlayFill } from "react-icons/bs";
import { IoMdPause } from "react-icons/io";
import { AiFillLike } from "react-icons/ai";
import { AiTwotoneDislike } from "react-icons/ai";
import { BsFillVolumeUpFill } from "react-icons/bs";
import { AiFillDislike } from "react-icons/ai";
import { useStateValue } from "../../state";
import { Link, useHistory } from "react-router-dom";
import "./watchvideo.scss";
import { Console } from "console";

interface Props {
  videoContent: any;
  setVideoContent: setVideoContent;
  allVideos: [];
  GetAllVideos: () => void;
  handleVideoRequest: () => void;
  video: any;
  handleLikeVideo: (video: any) => void;
  setIsLiked: setIsLiked;
  isLiked: boolean;
  videoIsLiked: () => void;
}

interface Comment {
  name: string;
  pic: string;
  comment: string;
}

const Watchvideo: React.FC<Props> = ({
  videoContent,
  setVideoContent,
  allVideos,
  GetAllVideos,
  handleVideoRequest,
  video,
  handleLikeVideo,
  isLiked,
  setIsLiked,
  videoIsLiked,
}) => {
  const history = useHistory();
  const [{ auth }, dispatch] = useStateValue();
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
  // const [video, setVideo] = useState<any>({});

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

  const SubmitNewComment = async (e: any, videoContent: any, comment: {}) => {
    e.preventDefault();
    let video_id = parseInt(videoContent.video_id);
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
        handleVideoRequest();
      })
      .catch((error) => console.error("post not updated succesfully", error));

    setComment({ name: auth.user.name, pic: auth.user.pic, comment: "" });
  };

  // CURRENT VIDEO REQUEST //
  useEffect(() => {
    console.log("fireddd");
    handleVideoRequest();
    GetAllVideos();
    videoIsLiked();
  }, [videoContent]);

  // const videoIsLiked = () => {
  //   if (
  //     auth.user.likes.some(
  //       (likedVideo: any) => likedVideo.video_id === video.video_id
  //     )
  //   ) {
  //     console.log("Object found inside the array.", video.video_id);

  //     setIsLiked(true);
  //   } else {
  //     console.log("Object not found.");
  //   }
  // };

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

                  <div>
                    <BsFillVolumeUpFill
                      style={{
                        color: "white",
                        position: "relative",
                        top: "2.5px",
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
                        top: "2.5px",
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
              <span>0 views</span>
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
                        color: "blue",
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
                      }}
                    />
                  )}
                  {video.likes}
                </span>
              </div>
              <div>
                <span>
                  <AiFillDislike
                    style={{
                      position: "relative",
                      top: "3",
                      marginRight: "5px",
                    }}
                  />
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
              <button onClick={videoIsLiked}>Subscribe</button>
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
                  setVideoContent(video.video_id);
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
