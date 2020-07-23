import React from "react";
import { useStateValue } from "../../state";

interface Props {}

const Profileabout: React.FC<Props> = ({}) => {
  const [{ auth, components }, dispatch] = useStateValue();

  return (
    <>
      <div className="about-main">
        <h1 style={{ color: "white" }}>About me</h1>
        <p>{auth.user.about}</p>
      </div>
    </>
  );
};

export default Profileabout;
