import React from "react";
import Button from "../Button";

const ButtonClear = ({
  link = "",
  onClick,
  children,
  className = "",
  role = "button",
  width = "min-w-[4rem]",
  id,
}) => {
  return (
    <Button
      link={link}
      onClick={onClick}
      role={role}
      className={`bg-inherit hover:bg-gray-100 active:bg-gray-200 ${width} duration-200 ease-out${
        className && " " + className
      }`}
      id={id}
    >
      {children}
    </Button>
  );
};

export default ButtonClear;
