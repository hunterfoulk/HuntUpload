import React from "react";
import pic from "../../images/noresults.jpg";

import "./search.scss";

interface Props {}

const Noresults: React.FC<Props> = ({}) => {
  return (
    <>
      <div className="no-results-main">
        <div className="img-container">
          <img src={pic} />
        </div>
      </div>
    </>
  );
};

export default Noresults;
