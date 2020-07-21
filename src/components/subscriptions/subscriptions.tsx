import React from "react";
import "./subs.scss";
import { useStateValue } from "../../state";

interface Props {}

const Subscriptions: React.FC<Props> = ({}) => {
  const [{ auth }, dispatch] = useStateValue();

  return (
    <>
      <div className="subs-container">
        <div>
          <h1>Helloooo</h1>
          {auth.user.subscriptions.map((sub: any) => (
            <span>{sub.name}</span>
          ))}
        </div>
      </div>
    </>
  );
};

export default Subscriptions;
