import React from "react";
import { Transition } from "react-spring/renderprops";
// import { Transition, animated } from "react-spring";

const VideoModalTransition = ({ uploadModal, children }) => {
  return (
    <Transition
      items={uploadModal}
      from={{
        transform: "translate3d(0,-0px,0)",
      }}
      enter={{ opacity: 1, transform: "translate3d(0,80,0)", zIndex: "500" }}
      leave={{
        opacity: 0,
        transform: "translate3d(0,10px,0)",
        pointerEvents: "none",
      }}
      delay={1}
    >
      {(open) => open && ((props) => <div style={props}>{children}</div>)}
    </Transition>
  );
};

export default VideoModalTransition;
