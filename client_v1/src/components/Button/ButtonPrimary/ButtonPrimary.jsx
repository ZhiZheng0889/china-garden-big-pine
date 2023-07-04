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
      className={`bg-red-600 hover:bg-red-700 active:bg-red-800 text-white rounded ${width} duration-200 ease-out${
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
