import React from "react";
import Button from "../Button";

const ButtonPrimary = ({
  link = "",
  onClick,
  children,
  className = "",
  role = "button",
  width = "min-w-[4rem]",
  id,
  type,
}) => {
  return (
    <Button
      link={link}
      onClick={onClick}
      role={role}
      className={`bg-red-600 hover:bg-red-700 active:bg-red-800 text-white rounded ${width} duration-200 ease-out focus:outline outline-2 outline-offset-2 outline-red-600${
        className && " " + className
      }`}
      id={id}
      type={type}
    >
      {children}
    </Button>
  );
};

export default ButtonPrimary;
