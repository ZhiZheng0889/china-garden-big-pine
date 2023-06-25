import React from "react";
import Button from "../Button";

const ButtonWhite = ({
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
      className={`bg-white hover:bg-gray-100 active:bg-gray-200 ${width} duration-200 ease-out${
        className && " " + className
      }`}
    >
      {children}
    </Button>
  );
};

export default ButtonWhite;
