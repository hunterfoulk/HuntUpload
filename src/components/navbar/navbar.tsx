import React, { useState, useEffect } from "react";
import "./navbar.scss";
import { AiOutlineSearch } from "react-icons/ai";
import { AiFillYoutube } from "react-icons/ai";
import { IoMdPerson } from "react-icons/io";
import { FaSignOutAlt } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";
import { MdVideoCall } from "react-icons/md";
import { MdNotifications } from "react-icons/md";
import { useStateValue } from "../../state";
import useInput from "../../hooks/useInput";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { title } from "process";

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
  const [isTerm, setTerm] = useState(false);
  const [clicked, setClicked] = useState(false);
  const history = useHistory();
  // const searchterm = useInput("");

  const searchedVideos = async () => {
    try {
      const response = await fetch(
        "http://localhost:9000/.netlify/functions/server/youtube/searchvideos"
      );
      const jsonData = await response.json();

      setTitles(jsonData);
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

  const handleSearchTerm = (e: any) => {
    if (e.target.value !== "") {
      setSearchterm(e.target.value);

      let filteredData = titles.filter((video: any) =>
        video.title?.toLowerCase().includes(e.target.value.toLowerCase())
      );

      setTitles(filteredData);
    } else {
      searchedVideos();
    }
  };

  // const [data, setData] = useState(['hey', 'goodbye'])
  // const [search, setSearch] = useState('');

  // const filteredData = data.filter(d => d.includes(search))

  // window.location.pathname.replace("/search/", "");

  const handleClick = async (video: any) => {
    // setSearchterm(video.title);

    history.push(`/search/${video.title}`);
  };

  return (
    <>
      <div className="navbar">
        {isTerm && (
          <div className="search-dropdown">
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
          <div className="nav-dropdown">
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
