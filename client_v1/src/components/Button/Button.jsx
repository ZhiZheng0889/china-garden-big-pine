import React from "react";
import { Link } from "react-router-dom";

const Button = ({
  link = "",
  onClick,
  children,
  className = "",
  role = "button",
  padding = "px-3 py-2",
  id,
}) => {
  const parentClass = className;
  if (onClick !== undefined) {
    return (
      <button
        onClick={onClick}
        className={`${parentClass} ${padding}`}
        role={role}
        id={id}
      >
        {children}
      </button>
    );
  } else {
    return (
      <button
        className={`${parentClass} ${padding} outline-2 outline-offset-2 outline-red-600`}
        role={role}
        id={id}
      >
        {children}
      </button>
    );
  }
};

export default Button;
