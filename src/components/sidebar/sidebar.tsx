import React from "react";
import "./sidebar.scss";
import { AiFillHome } from "react-icons/ai";
import { BsCollectionPlayFill } from "react-icons/bs";
import { AiTwotoneLike } from "react-icons/ai";
import { MdVideoLibrary } from "react-icons/md";
import { AiFillFire } from "react-icons/ai";
import { Link, useHistory } from "react-router-dom";

interface Props {}

const Sidebar: React.FC<Props> = ({}) => {
  const history = useHistory();
  return (
    <>
      <div className="sidebar">
        <div className="sidebar-top">
          <div onClick={() => history.push("/")} className="rows">
            <span>
              <AiFillHome
                style={{
                  position: "relative",
                  top: "2.5px",
                  marginRight: "5px",
                }}
              />
              Home
            </span>
          </div>
          <div onClick={() => history.push("/subs")} className="rows">
            <span>
              {" "}
              <BsCollectionPlayFill
                style={{
                  position: "relative",
                  top: "2.5px",
                  marginRight: "5px",
                }}
              />
              Subscriptions
            </span>
          </div>
          <div onClick={() => history.push("/likes")} className="rows">
            <span>
              <AiTwotoneLike
                style={{
                  position: "relative",
                  top: "2.5px",
                  marginRight: "5px",
                }}
              />
              liked Videos
            </span>
          </div>
        </div>
        <div className="sidebar-bottom">
          <div onClick={() => history.push("/subs")} className="rows">
            <span>
              {" "}
              <MdVideoLibrary
                style={{
                  position: "relative",
                  top: "2.5px",
                  marginRight: "5px",
                }}
              />
              Libraries
            </span>
          </div>
          <div onClick={() => history.push("/likes")} className="rows">
            <span>
              <AiFillFire
                style={{
                  position: "relative",
                  top: "2.5px",
                  marginRight: "5px",
                }}
              />
              Trending
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
