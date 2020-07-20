import React, { useState, useEffect } from "react";
import "./app.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import Sidebar from "./components/sidebar/sidebar";
import Subscriptions from "./components/subscriptions/subscriptions";
import Likes from "./components/likes/likes";
import Home from "./components/home/home";
import Login from "./components/login/login";
import Signup from "./components/signup/signup";
import Profile from "./components/profile/profile";
import Backdrop from "./components/backdrop/backdrop";
import Editprofile from "./components/editprofile/editprofile";
import UploadVideo from "./components/uploadvideo/uploadvideo";
import ModalTransition from "././hooks/transition";
import VideoModalTransition from "././hooks/videotransition";
import WatchVideo from "./components/watchvideo/watchvideo";
import { useStateValue } from "../src/state";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

interface Props {}

const App: React.FC<Props> = ({}) => {
  const [dropdown, setDropdown] = useState<boolean>(false);
  const [editProfileModal, setEditProfileModal] = useState(false);
  const [backdrop, setBackdrop] = useState(false);
  const [uploadModal, setUploadModal] = useState(false);
  const [videoContent, setVideoContent] = useState<any>(null);
  const [allVideos, setAllVideos] = useState<any>([]);
  const [video, setVideo] = useState<any>({});
  const history = useHistory();
  const [{ auth }, dispatch] = useStateValue();
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const OpenEditProfileFunc = () => {
    setEditProfileModal(true);
    setBackdrop(true);
  };

  const CloseEditProfileFunc = () => {
    setEditProfileModal(false);
    setBackdrop(false);
    setUploadModal(false);
  };

  const OpenUploadModal = () => {
    setUploadModal(true);
    setBackdrop(true);
    console.log("modal");
  };

  // GET ALL VIDEOS //
  const GetAllVideos = async () => {
    try {
      const response = await fetch(
        "http://localhost:9000/.netlify/functions/server/youtube/allvideos"
      );
      const jsonData = await response.json();

      setAllVideos(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };

  // CURRENT VIDEO //
  const handleVideoRequest = async () => {
    console.log("video content", videoContent);
    const queryParams = { params: { videoContent } };
    await axios
      .get(
        "http://localhost:9000/.netlify/functions/server/youtube/currentvideo",
        queryParams
      )
      .then((res) => {
        setVideo(res.data);
      })
      .catch((error) => {
        console.error("error", error);
      });
  };

  useEffect(() => {
    handleVideoRequest();
  }, [videoContent]);

  console.log("liked state", isLiked);

  const handleLikeVideo = async (video: any) => {
    let video_id = parseInt(video.video_id);
    let user_id = parseInt(auth.user.user_id);

    console.log(video);
    video.likes++;

    console.log(video.likes);
    let newLikes = video.likes;
    let newLikedVid = video;

    await axios
      .post(
        "http://localhost:9000/.netlify/functions/server/youtube/updatelikes",
        {
          video_id: video_id,
          user_id: user_id,
          newLikes: newLikes,
          newLikedVid: newLikedVid,
        }
      )
      .then((res) => {
        let user = res.data.payload;
        console.log("video like data", res);
        console.log("payload", res.data.payload);
        setVideoContent(video);

        dispatch({
          type: "update",
          auth: {
            user: user,
          },
        });
        setIsLiked(true);
      })
      .catch((error) => console.log(error));
  };

  // const videoIsLiked = () => {
  //   if (auth.user.likes.indexOf(video.video_id)) {
  //     console.log("VIDEO IS IN LIKES", video.video_id);
  //     setIsLiked(true);
  //     console.log("my likes", auth.user.likes);
  //   } else {
  //     console.log("VIDEO IS NOT IN LIKES");
  //     setIsLiked(false);
  //   }
  // };

  const videoIsLiked = () => {
    if (
      auth.user.likes.some(
        (likedVideo: any) => likedVideo.video_id === video.video_id
      )
    ) {
      console.log("Object found inside the array.", video.video_id);

      setIsLiked(true);
    } else {
      console.log("Object not found.");
      setIsLiked(false);
    }
  };

  useEffect(() => {
    videoIsLiked();
  }, [video]);

  return (
    <>
      <Router>
        {backdrop && <Backdrop CloseEditProfileFunc={CloseEditProfileFunc} />}
        <div className="page-container">
          <ModalTransition editProfileModal={editProfileModal}>
            {editProfileModal && <Editprofile />}
          </ModalTransition>
          <VideoModalTransition uploadModal={uploadModal}>
            {uploadModal && <UploadVideo />}
          </VideoModalTransition>
          {/* HOME ROUTE */}
          <Route
            exact
            path="/"
            render={() => (
              <>
                <Navbar
                  OpenUploadModal={OpenUploadModal}
                  dropdown={dropdown}
                  setDropdown={setDropdown}
                />
                <div className="home-container">
                  <Sidebar />
                  <Home />
                </div>
              </>
            )}
          ></Route>
          {/* LOGIN ROUTE */}
          <Route
            exact
            path="/login"
            render={() => (
              <>
                <Login />
              </>
            )}
          ></Route>
          {/* SIGNUP ROUTE */}
          <Route
            exact
            path="/register"
            render={() => (
              <>
                <Signup />
              </>
            )}
          ></Route>
          {/* SUBSCRIPTION ROUTE */}
          <Route
            exact
            path="/subs"
            render={() => (
              <>
                <Navbar
                  dropdown={dropdown}
                  setDropdown={setDropdown}
                  OpenUploadModal={OpenUploadModal}
                />
                <div className="home-container">
                  <Sidebar />
                  <Subscriptions />
                </div>
              </>
            )}
          ></Route>
          {/* PROFILE ROUTE */}
          <Route
            exact
            path="/profile"
            render={() => (
              <>
                <Navbar
                  OpenUploadModal={OpenUploadModal}
                  dropdown={dropdown}
                  setDropdown={setDropdown}
                />
                <div className="home-container">
                  <Sidebar />
                  <Profile
                    OpenEditProfileFunc={OpenEditProfileFunc}
                    setVideoContent={setVideoContent}
                  />
                </div>
              </>
            )}
          ></Route>
          {/* LIKES ROUTE */}
          <Route
            exact
            path="/likes"
            render={() => (
              <>
                <Navbar
                  OpenUploadModal={OpenUploadModal}
                  dropdown={dropdown}
                  setDropdown={setDropdown}
                />
                <div className="home-container">
                  <Sidebar />
                  <Likes />
                </div>
              </>
            )}
          ></Route>

          <Route
            exact
            path="/video"
            render={() => (
              <>
                <Navbar
                  OpenUploadModal={OpenUploadModal}
                  dropdown={dropdown}
                  setDropdown={setDropdown}
                />
                <div className="home-container">
                  <Sidebar />
                  <WatchVideo
                    videoIsLiked={videoIsLiked}
                    setIsLiked={setIsLiked}
                    isLiked={isLiked}
                    handleLikeVideo={handleLikeVideo}
                    video={video}
                    GetAllVideos={GetAllVideos}
                    allVideos={allVideos}
                    setVideoContent={setVideoContent}
                    videoContent={videoContent}
                    handleVideoRequest={handleVideoRequest}
                  />
                </div>
              </>
            )}
          ></Route>
        </div>
      </Router>
    </>
  );
};

export default App;
