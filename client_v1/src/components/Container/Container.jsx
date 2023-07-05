import React from "react";

const Container = ({ children, className = "" }) => {
  return (
    <div
      className={`${
        className + " "
      }px-1 sm:px-3 md:px-6 md:max-w-[64rem] lg:max-w-[80rem] xl:max-w-[96rem] mx-auto`}
    >
      {children}
    </div>
  );
};

export default Container;
