import React, { useState } from "react";
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

interface Props {}

const App: React.FC<Props> = ({}) => {
  const [dropdown, setDropdown] = useState<boolean>(false);
  const [editProfileModal, setEditProfileModal] = useState(false);
  const [backdrop, setBackdrop] = useState(false);
  const [uploadModal, setUploadModal] = useState(true);

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
        </div>
      </Router>
    </>
  );
};

export default App;
