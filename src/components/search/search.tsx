import React, { useEffect } from "react";
import Noresults from "./notfound";
import "./search.scss";
import { Link, useHistory } from "react-router-dom";

interface Props {
  searchedVideos: any[];
  handleSubmit: (searchterm: any) => void;
  //   searchterm: any;
  setSearchterm: setSearchterm;
  setSearchedVideos: setSearchedVideos;
}

const Search: React.FC<Props> = ({
  searchedVideos,
  handleSubmit,
  setSearchterm,
  setSearchedVideos,
}) => {
  const fullPath = window.location.pathname;

  let searchterm = window.location.pathname.replace("/search/", "");
  const history = useHistory();

  useEffect(() => {
    // searchterm.replace(/%20/g, " ");
    console.log("FULL PATHNAME", window.location.pathname);
    console.log("PARSED search term", searchterm);
    // searchterm.replace(/%20/g, " ");
    handleSubmit(searchterm);
    return () => {
      setSearchterm("");
      setSearchedVideos([]);
    };
  }, [fullPath]);

  if (searchedVideos.length === null) {
    return <Noresults />;
  }

  return (
    <>
      <div className="search-main">
        <div className="search-container">
          {searchedVideos.map((video: any) => (
            <div className="searched-videos">
              <div className="thumbnail-container">
                <video
                  onClick={async () => {
                    history.push(`/video/${video.video_id}`);
                  }}
                  src={video.link}
                />
              </div>
              <div className="text-container">
                <div className="title-container">
                  <span style={{ color: "white" }}>{video.title}</span>
                </div>
                <div className="name-container">
                  <span>
                    {video.uploader}

                    <span>
                      <span style={{ marginRight: "5px" }}>{video.views}</span>
                      views
                    </span>
                  </span>
                </div>
                <div className="description-container">
                  <span>{video.description}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Search;
