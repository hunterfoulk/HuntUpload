import React from "react";
import "./skeletons.scss";
interface Props {}

const Searchskeleton: React.FC<Props> = ({}) => {
  return (
    <>
      <div className="search-skeleton-main">
        <div className="search-skeleton-container">
          <div className="search-vids">
            <div className="vid"></div>
            <div>
              <div className="title"></div>
              <div className="title-two"></div>
            </div>
          </div>
          <div className="search-vids">
            <div className="vid"></div>
            <div>
              <div className="title"></div>
              <div className="title-two"></div>
            </div>
          </div>
          <div className="search-vids">
            <div className="vid"></div>
            <div>
              <div className="title"></div>
              <div className="title-two"></div>
            </div>
          </div>
          <div className="search-vids">
            <div className="vid"></div>
            <div>
              <div className="title"></div>
              <div className="title-two"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Searchskeleton;
