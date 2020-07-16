import React from "react";
import "./navbar.scss";
import { AiOutlineSearch } from "react-icons/ai";
import { AiFillYoutube } from "react-icons/ai";
import { IoMdPerson } from "react-icons/io";
import { FaSignOutAlt } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";
import { MdVideoCall } from "react-icons/md";
import { MdNotifications } from "react-icons/md";
import { useStateValue } from "../../state";
import { Link, useHistory } from "react-router-dom";

interface Props {
  setDropdown: SetDropDown;
  dropdown: boolean;
  OpenUploadModal: () => void;
}

const Navbar: React.FC<Props> = ({
  setDropdown,
  dropdown,
  OpenUploadModal,
}) => {
  const [{ auth }, dispatch] = useStateValue();
  const history = useHistory();

  const profileRoute = (e: any) => {
    setDropdown(false);
    history.push("/profile");
  };

  const handleLogout = (e: any) => {
    localStorage.clear();

    dispatch({
      type: "logout",
    });

    setDropdown(false);
    history.push("/login");
  };

  return (
    <>
      <div className="navbar">
        <div className="left-container">
          <div style={{ marginLeft: "60px" }}>
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
          <input placeholder="Search..." />
          <button>
            <AiOutlineSearch
              style={{ position: "relative", top: "2px", cursor: "pointer" }}
            />
          </button>
        </div>
        <div className="right-container">
          <MdVideoCall
            onClick={() => OpenUploadModal()}
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

          <img onClick={() => setDropdown(!dropdown)} src={auth.user.pic} />
        </div>
        {dropdown && (
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
              <span>
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
