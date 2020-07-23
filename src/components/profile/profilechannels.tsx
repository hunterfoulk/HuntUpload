import React from "react";
import { useStateValue } from "../../state";

interface Props {}

const Profilechannels: React.FC<Props> = ({}) => {
  const [{ auth, components }, dispatch] = useStateValue();

  return (
    <>
      <div className="channels-main">
        {auth.user.subscriptions.map((channel: any) => (
          <div className="channel">
            <div className="channel-pic">
              <img src={channel.pic} />
            </div>
            <span>{channel.name}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default Profilechannels;
