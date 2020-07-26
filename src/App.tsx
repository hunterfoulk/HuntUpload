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
import Search from "./components/search/search";
import Noresults from "./components/search/notfound";
import { useStateValue } from "../src/state";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useHistory } from "react-router-dom";

interface Props {}

const App: React.FC<Props> = ({}) => {
  const [{ auth, components }, dispatch] = useStateValue();
  const [videoContent, setVideoContent] = useState<any>(null);
  const [allVideos, setAllVideos] = useState<any>([]);
  const [video, setVideo] = useState<any>({
    comments: [],
  });
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isDisliked, setIsDisliked] = useState<boolean>(false);
  const [isSubbed, setIsSubbed] = useState<boolean>(false);
  const [searchedVideos, setSearchedVideos] = useState([]);
  const [searchterm, setSearchterm] = useState("");
  const history = useHistory();

  const OpenEditProfileFunc = () => {
    dispatch({
      type: "manage",
      components: {
        ...components,
        backdrop: true,
        profileModal: true,
      },
    });
  };

  const CloseEditProfileFunc = () => {
    dispatch({
      type: "manage",
      components: {
        ...components,
        backdrop: false,
        profileModal: false,
        uploadModal: false,
      },
    });
  };

  // GET ALL VIDEOS //
  const GetAllVideos = async () => {
    try {
      const response = await fetch(
        "http://localhost:9000/.netlify/functions/server/youtube/allvideos"
      );
      const jsonData = await response.json();

      setAllVideos(jsonData);
      dispatch({
        type: "manage",
        components: {
          ...components,
          isFetching: false,
        },
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  // CURRENT VIDEO //
  const handleVideoRequest = async (video_id: any) => {
    console.log("vid id ", video_id);
    const queryParams = { params: { video_id } };

    await axios
      .get(
        `http://localhost:9000/.netlify/functions/server/youtube/currentvideo/${video_id}`,
        queryParams
      )
      .then((res) => {
        setVideo(res.data);
        dispatch({
          type: "manage",
          components: {
            ...components,
            isFetching: false,
          },
        });
      })
      .catch((error) => {
        console.error("error", error);
      });
  };

  console.log("liked state", isLiked);
  //////////////// HANDLE LIKE ///////////////////
  const handleLikeVideo = async (video: any) => {
    let video_id = parseInt(video.video_id);
    let user_id = parseInt(auth.user.user_id);

    console.log(video);

    console.log(video.likes);

    if (isLiked) {
      video.likes--;
      let newLikes = video.likes;
      let newLikedVid = video;
      console.log("video likes", video.likes);

      await axios
        .post(
          "http://localhost:9000/.netlify/functions/server/youtube/deletelike",
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
          localStorage.setItem("user", JSON.stringify(user));
          setVideo(video);

          dispatch({
            type: "update",
            auth: {
              user: user,
            },
          });
          setIsLiked(false);
        })
        .catch((error) => console.log(error));
    } else {
      video.likes++;
      let newLikes = video.likes;
      let newLikedVid = video;
      console.log("video likes", video.likes);
      console.log("test");
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
          localStorage.setItem("user", JSON.stringify(user));
          setVideo(video);
          dispatch({
            type: "update",
            auth: {
              user: user,
            },
          });
          setIsLiked(true);
        })
        .catch((error) => console.log(error));
    }
  };

  //////////////// HANDLE DISLIKE ///////////////////
  const handleDislike = async (video: any) => {
    let video_id = parseInt(video.video_id);
    let user_id = parseInt(auth.user.user_id);

    if (isLiked) {
      video.likes--;
      video.dislikes++;

      let newLikes = video.likes;
      let newDislikes = video.dislikes;
      let newDislikedVid = video;
      console.log("video likes", video.likes);
      console.log("video dislikes", video.dislikes);

      await axios
        .post(
          "http://localhost:9000/.netlify/functions/server/youtube/switchlikes",
          {
            video_id: video_id,
            user_id: user_id,
            newLikes: newLikes,
            newDislikes: newDislikes,
          }
        )
        .then((res) => {
          let user = res.data.payload;
          console.log("video like data", res);
          localStorage.setItem("user", JSON.stringify(user));
          console.log("payload", res.data.payload);
          setVideoContent(video);

          dispatch({
            type: "update",
            auth: {
              user: user,
            },
          });
          setIsLiked(false);
          setIsDisliked(true);
        })
        .catch((error) => console.log(error));
    } else {
      video.dislikes++;
      let newDislikes = video.dislikes;
      console.log("video dislikes", video.dislikes);
      console.log("video", video);

      await axios
        .post(
          "http://localhost:9000/.netlify/functions/server/youtube/dislikevideo",
          {
            video_id: video_id,
            newDislikes: newDislikes,
          }
        )
        .then((res) => {
          console.log("response", res);
          setIsLiked(false);
          setIsDisliked(true);
        })
        .catch((error) => console.log(error));
    }
  };

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

  const isSubscribed = () => {
    if (
      auth.user.subscriptions.some((vid: any) => vid.user_id === video.user_id)
    ) {
      console.log("IS SUBSCRIBED", video.user_id);
      setIsSubbed(true);
    } else {
      console.log("IS NOT SUBSCRIBED");
      setIsSubbed(false);
      console.log("VIDEO USER ID", video.user_id);
    }
  };

  ///////////// HANDLE SUBSCRIBE /////////////
  const handleSubscribe = async (video: any) => {
    console.log("user id", video.user_id);
    let videoUser = parseInt(video.user_id);
    let user_id = parseInt(auth.user.user_id);

    await axios
      .post(
        "http://localhost:9000/.netlify/functions/server/youtube/subscribe",
        {
          videoUser: videoUser,
          user_id: user_id,
        }
      )
      .then((res) => {
        let user = res.data.payload;
        console.log("subsriber user data", res);
        localStorage.setItem("user", JSON.stringify(user));
        console.log("payload", res.data.payload);
        setIsSubbed(true);
        dispatch({
          type: "update",
          auth: {
            user: user,
          },
        });
      })
      .catch((error) => console.log(error));
  };

  ////////// SEARCH /////////
  const handleSubmit = async (searchterm: string) => {
    // setSearchterm(searchterm.replace(/%20/g, " "));
    const queryParams = { params: { searchterm } };
    console.log("handle sarch term", searchterm);
    await axios
      .get(
        `http://localhost:9000/.netlify/functions/server/youtube/search/${searchterm}`,
        queryParams
      )
      .then((res) => {
        console.log("search response", res.data);
        setSearchedVideos(res.data);
        dispatch({
          type: "manage",
          components: {
            ...components,
            isFetching: false,
          },
        });
      })
      .catch((error) => {
        console.error("error", error);
      });
  };
  // if (searchedVideos.length === 0) {
  //   history.push("/noresults");
  // }
  return (
    <>
      <Router>
        <ToastContainer />
        {components.backdrop && (
          <Backdrop CloseEditProfileFunc={CloseEditProfileFunc} />
        )}
        <div className="page-container">
          <ModalTransition editProfileModal={components.profileModal}>
            {components.profileModal && <Editprofile />}
          </ModalTransition>
          <VideoModalTransition uploadModal={components.uploadModal}>
            {components.uploadModal && <UploadVideo />}
          </VideoModalTransition>

          {/* HOME ROUTE */}
          <Route
            exact
            path="/"
            render={() => (
              <>
                <Navbar
                  searchterm={searchterm}
                  setSearchedVideos={setSearchedVideos}
                  handleSubmit={handleSubmit}
                  setSearchterm={setSearchterm}
                />
                <div className="home-container">
                  <Sidebar />
                  <Home GetAllVideos={GetAllVideos} allVideos={allVideos} />
                </div>
              </>
            )}
          ></Route>
          {/* LOGIN ROUTE */}
          <Route exact path="/login" render={() => <Login />}></Route>
          {/* SIGNUP ROUTE */}
          <Route exact path="/register" render={() => <Signup />}></Route>
          {/* SUBSCRIPTION ROUTE */}
          <Route
            exact
            path="/subs"
            render={() => (
              <>
                <Navbar
                  searchterm={searchterm}
                  setSearchedVideos={setSearchedVideos}
                  handleSubmit={handleSubmit}
                  setSearchterm={setSearchterm}
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
                  searchterm={searchterm}
                  setSearchedVideos={setSearchedVideos}
                  handleSubmit={handleSubmit}
                  setSearchterm={setSearchterm}
                />
                <div className="home-container">
                  <Sidebar />
                  <Profile OpenEditProfileFunc={OpenEditProfileFunc} />
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
                  setSearchedVideos={setSearchedVideos}
                  searchterm={searchterm}
                  handleSubmit={handleSubmit}
                  setSearchterm={setSearchterm}
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
            path="/video/:video_id"
            render={() => (
              <>
                <Navbar
                  setSearchedVideos={setSearchedVideos}
                  searchterm={searchterm}
                  handleSubmit={handleSubmit}
                  setSearchterm={setSearchterm}
                />
                <div className="home-container">
                  <Sidebar />
                  <WatchVideo
                    isSubscribed={isSubscribed}
                    isSubbed={isSubbed}
                    handleSubscribe={handleSubscribe}
                    isDisliked={isDisliked}
                    handleDislike={handleDislike}
                    videoIsLiked={videoIsLiked}
                    setIsLiked={setIsLiked}
                    isLiked={isLiked}
                    handleLikeVideo={handleLikeVideo}
                    video={video}
                    GetAllVideos={GetAllVideos}
                    allVideos={allVideos}
                    handleVideoRequest={handleVideoRequest}
                  />
                </div>
              </>
            )}
          ></Route>

          {/* SEARCH ROUTE */}
          <Route
            exact
            path="/search/:searchterm"
            render={() => (
              <>
                <Navbar
                  setSearchedVideos={setSearchedVideos}
                  searchterm={searchterm}
                  handleSubmit={handleSubmit}
                  setSearchterm={setSearchterm}
                />
                <div className="home-container">
                  <Sidebar />
                  <Search
                    setSearchedVideos={setSearchedVideos}
                    setSearchterm={setSearchterm}
                    // searchterm={searchterm}
                    handleSubmit={handleSubmit}
                    searchedVideos={searchedVideos}
                  />
                </div>
              </>
            )}
          ></Route>

          {/* NO RESULSTS ROUTE */}
          <Route
            exact
            path="/noresults"
            render={() => (
              <>
                <Navbar
                  setSearchedVideos={setSearchedVideos}
                  searchterm={searchterm}
                  handleSubmit={handleSubmit}
                  setSearchterm={setSearchterm}
                />
                <div className="home-container">
                  <Sidebar />
                  <Noresults />
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
