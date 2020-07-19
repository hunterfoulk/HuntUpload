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
      console.log("all videos", jsonData);
      console.log("fired");
    } catch (error) {
      console.error(error.message);
    }
  };

  console.log("vid content", videoContent);

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
        console.log("response for video", res);
        setVideo(res.data);
        console.log("data comments", res.data.comments);
      })
      .catch((error) => {
        console.error("error", error);
      });
  };

  useEffect(() => {
    handleVideoRequest();
  }, [videoContent]);

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
