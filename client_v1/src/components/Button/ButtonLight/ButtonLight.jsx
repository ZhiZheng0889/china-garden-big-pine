import React from "react";
import Button from "../Button";

const ButtonLight = ({
  link = "",
  onClick,
  children,
  className = "",
  role = "button",
  width = "min-w-[4rem]",
}) => {
  return (
    <Button
      link={link}
      onClick={onClick}
      role={role}
      className={`bg-gray-100 hover:bg-gray-200 active:bg-gray-300 rounded ${width} duration-200 ease-out focus:outline outline-2 outline-offset-2 outline-red-600${
        className && " " + className
      }`}
    >
      {children}
    </Button>
  );
};

export default ButtonLight;
