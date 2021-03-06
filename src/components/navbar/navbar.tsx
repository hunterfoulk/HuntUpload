import React, { useState, useEffect, useRef } from "react";
import "./navbar.scss";
import { AiOutlineSearch } from "react-icons/ai";
import { AiFillYoutube } from "react-icons/ai";
import { IoMdPerson } from "react-icons/io";
import { FaSignOutAlt, FaLess } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";
import { MdVideoCall } from "react-icons/md";
import { MdNotifications } from "react-icons/md";
import { useStateValue } from "../../state";
import useInput from "../../hooks/useInput";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import useClickOutside from "../../hooks/useClickOutside";

interface Props {
  setSearchedVideos: setSearchedVideos;
  handleSubmit: (searchterm: any) => void;
  setSearchterm: setSearchterm;
  searchterm: any;
}

const Navbar: React.FC<Props> = ({
  setSearchedVideos,
  handleSubmit,
  setSearchterm,
  searchterm,
}) => {
  const [{ auth, components }, dispatch] = useStateValue();
  const [titles, setTitles] = useState([]);
  const [originalTitles, setOriginalTitles] = useState([]);
  const [isTerm, setTerm] = useState(false);
  const [clicked, setClicked] = useState(false);
  const history = useHistory();

  const ref = useRef<any>();
  useClickOutside(ref, () => setTerm(false));

  const searchedVideos = async () => {
    try {
      const response = await fetch(
        "http://localhost:9000/.netlify/functions/server/youtube/searchvideos"
      );
      const jsonData = await response.json();

      setOriginalTitles(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };

  const profileRoute = (e: any) => {
    dispatch({
      type: "manage",
      components: {
        ...components,
        navdrop: false,
      },
    });
    history.push("/profile");
  };

  const handleLogout = async (e: any) => {
    localStorage.clear();

    await dispatch({
      type: "logout",
    });
    await dispatch({
      type: "manage",
      components: {
        ...components,
        navdrop: false,
      },
    });
    setTimeout(() => {
      history.push("/login");
    }, 500);
  };

  useEffect(() => {
    searchedVideos();
  }, []);

  useEffect(() => {
    if (titles.length === 0) {
      setTerm(false);
    }
  }, [titles]);

  const handleSearchTerm = (e: any) => {
    setTerm(true);
    const value = e.target.value;
    if (value !== "") {
      setSearchterm(value);
      let filteredData = originalTitles.filter((video: any) =>
        video.title?.toLowerCase().includes(value.toLowerCase())
      );
      setTitles(filteredData);
    } else {
      setTerm(false);
      searchedVideos();
    }
  };

  const handleClick = async (video: any) => {
    history.push(`/search/${video.title}`);
    setTerm(false);
  };

  return (
    <>
      <div className="navbar">
        {titles.length > 0 && isTerm && (
          <div className="search-dropdown" ref={ref}>
            <>
              {titles.map((video: any, i: number) => (
                <div key={i} className="title-wrapper">
                  <span onClick={() => handleClick(video)}>{video.title}</span>
                </div>
              ))}
            </>
          </div>
        )}

        <div className="left-container">
          <div style={{ marginLeft: "100px" }}>
            <span>Hunt</span>
            <span style={{ color: "#E53B38" }}>Upload</span>
            <AiFillYoutube
              style={{
                color: "#E53B38",
                position: "relative",
                top: "3px",
                fontSize: "24px",
              }}
            />
          </div>
        </div>
        <div className="middle-container">
          <form
            onSubmit={() => {
              history.push(`/search/${decodeURIComponent(searchterm)}`);
            }}
          >
            <input
              onFocus={() => setTerm(true)}
              onChange={(e: any) => handleSearchTerm(e)}
              placeholder="Search..."
              type="text"
            />

            <button type="submit">
              <AiOutlineSearch
                style={{ position: "relative", top: "2px", cursor: "pointer" }}
              />
            </button>
          </form>
        </div>

        <div className="right-container">
          <MdVideoCall
            onClick={() => {
              dispatch({
                type: "manage",
                components: {
                  ...components,
                  uploadModal: true,
                  backdrop: true,
                },
              });
            }}
            style={{
              fontSize: "30px",
              position: "relative",
              top: "1px",
              right: "50px",
              cursor: "pointer",
            }}
          />
          <MdNotifications
            style={{
              fontSize: "25px",
              position: "relative",
              top: "3px",
              right: "30px",
              cursor: "pointer",
            }}
          />

          <img
            onClick={() => {
              dispatch({
                type: "manage",
                components: {
                  ...components,
                  navdrop: !components.navdrop,
                },
              });
            }}
            src={auth.user.pic}
          />
        </div>
        {components.navdrop && (
          <div className="nav-dropdown" ref={ref}>
            <div className="nav-dropdown-header">
              <img src={auth.user.pic} />
              <div>
                <span style={{ fontSize: "20px" }}>{auth.user.name}</span>
                <br></br>
                <span>{auth.user.email}</span>
              </div>
            </div>
            <div className="nav-dropdown-middle">
              <span onClick={(e: any) => profileRoute(e)}>
                <IoMdPerson
                  style={{
                    marginRight: "5px",
                    position: "relative",
                    top: "2px",
                  }}
                />
                Your Channel
              </span>
              <span
                onClick={() => {
                  dispatch({
                    type: "manage",
                    components: {
                      ...components,
                      uploadModal: true,
                      backdrop: true,
                      navdrop: false,
                    },
                  });
                }}
              >
                <FiUpload
                  style={{
                    marginRight: "5px",
                    position: "relative",
                    top: "2px",
                  }}
                />
                Upload
              </span>
              <span onClick={(e: any) => handleLogout(e)}>
                <FaSignOutAlt
                  style={{
                    marginRight: "5px",
                    position: "relative",
                    top: "2px",
                  }}
                />
                Sign Out
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
