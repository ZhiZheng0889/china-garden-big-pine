import React from "react";
import Button from "../Button";

const ButtonWhite = ({
  link = "",
  onClick,
  children,
  className = "",
  role = "button",
  width = "min-w-[4rem]",
  padding,
}) => {
  return (
    <Button
      link={link}
      onClick={onClick}
      role={role}
      padding={padding}
      className={`bg-white hover:bg-gray-100 active:bg-gray-200 ${width} duration-200 ease-out focus:outline outline-2 outline-offset-2 outline-red-600${
        className && " " + className
      }`}
    >
      {children}
    </Button>
  );
};

export default ButtonWhite;
