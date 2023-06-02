import React from "react";

const Card = ({ padding = "p-3", className, children }) => {
  return (
    <article className={`${className + " "}${padding} border bg-white`}>
      {children}
    </article>
  );
};

export default Card;
