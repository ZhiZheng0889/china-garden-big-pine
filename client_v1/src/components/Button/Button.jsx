import React from "react";
import { Link } from "react-router-dom";

const Button = ({
  link = "",
  onClick,
  children,
  className = "",
  role = "button",
  padding = "px-3 py-2",
}) => {
  const parentClass = className;
  if (onClick !== undefined) {
    return (
      <button
        onClick={onClick}
        className={`${parentClass} ${padding}`}
        role={role}
      >
        {children}
      </button>
    );
  } else {
    return (
      <button className={`${parentClass} ${padding}`} role={role}>
        {children}
      </button>
    );
  }
};

export default Button;
