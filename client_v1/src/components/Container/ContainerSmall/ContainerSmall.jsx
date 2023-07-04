import React from "react";

const ContainerSmall = ({ children, className = "" }) => {
  return (
    <div className={`${className + " "}max-w-2xl mx-auto`}>{children}</div>
  );
};

export default ContainerSmall;
