import React, { useEffect } from "react";
import Noresults from "./notfound";
import Skeleton from "../skeletons/searchskelteon";
import "./search.scss";
import { Link, useHistory } from "react-router-dom";
import { useStateValue } from "../../state";

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
  const [{ auth, components }, dispatch] = useStateValue();

  const clearResults = () => {
    setSearchterm("");
    setSearchedVideos([]);
    dispatch({
      type: "manage",
      components: {
        ...components,
        isFetching: true,
      },
    });
  };

  let searchterm = window.location.pathname.replace("/search/", "");
  const history = useHistory();
  console.log("FETCH", components.isFetching);
  useEffect(() => {
    console.log("FULL PATHNAME", window.location.pathname);
    console.log("PARSED search term", searchterm);
    handleSubmit(searchterm);
    return () => {
      clearResults();
    };
  }, [fullPath]);

  if (components.isFetching) {
    return <Skeleton />;
  }

  if (!components.isFetching && searchedVideos.length === 0) {
    return <Noresults />;
  }

  return (
    <>
      <div className="search-main">
        {!components.isFetching && (
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
                        <span style={{ marginRight: "5px" }}>
                          {video.views}
                        </span>
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
        )}
      </div>
    </>
  );
};

export default Search;
