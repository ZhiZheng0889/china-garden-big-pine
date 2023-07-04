import React from "react";
import Button from "../Button";

const ButtonWhitePill = ({
  link = "",
  onClick,
  children,
  className = "",
  role,
  width,
  padding = "py-1 px-3",
}) => {
  return (
    <Button
      link={link}
      onClick={onClick}
      role={role}
      width={width}
      padding={padding}
      className={`${
        className && className + " "
      }drop-shadow-md rounded-full border bg-slate-50 hover:bg-slate-100 focus:outline active:translate-y-0.5 active:drop-shadow outline-2 outline-offset-2 outline-red-600 duration-200 ease-out${
        className && " " + className
      }`}
    >
      {children}
    </Button>
  );
};

export default ButtonWhitePill;
