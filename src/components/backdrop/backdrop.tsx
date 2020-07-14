import React from "react";
import "./backdrop.scss";

interface Props {
  CloseEditProfileFunc: () => void;
}

const Backdrop: React.FC<Props> = ({ CloseEditProfileFunc }) => {
  return (
    <>
      {" "}
      <div onClick={() => CloseEditProfileFunc()} className="backdrop"></div>
    </>
  );
};

export default Backdrop;
