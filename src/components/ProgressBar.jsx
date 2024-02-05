import React from "react";

const ProgressBar = (props) => {
  const { bgcolor, completed } = props;

  const containerStyles = {
    height: 5,
    width: "100%",
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
  };

  const progressStyles = {
    height: 5,
    width: `${completed}%`,
    backgroundColor: bgcolor,
    borderRadius: 5,
  };

  return (
    <div style={containerStyles}>
      <div style={progressStyles}></div>
    </div>
  );
};

export default ProgressBar;