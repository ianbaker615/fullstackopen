import React from "react";

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }
  const msg = message[0];
  const flag = message[1];
  const nameOfClass = flag === false ? "error" : "success";

  return <div className={nameOfClass}>{msg}</div>;
};
export default Notification;
