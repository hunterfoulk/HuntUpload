import React from "react";
import "./subs.scss";
import { useStateValue } from "../../state";

interface Props {}

const Subscriptions: React.FC<Props> = ({}) => {
  const [{ auth }, dispatch] = useStateValue();

  return (
    <>
      <div className="subs-container">
        <div className="subs-main">
          {auth.user.subscriptions.map((sub: any) => (
            <div className="sub">
              <div className="sub-pic-container">
                <img src={sub.pic} />
              </div>
              <div className="sub-name-container">
                <span className="sub-name">{sub.name}</span>
                <span style={{ color: "rgb(247, 247, 247)" }}>
                  Subscribers:{sub.subcount}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Subscriptions;
