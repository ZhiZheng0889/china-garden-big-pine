import React from "react";

const Card = ({ padding = "p-3", className, children, id = "" }) => {
  return (
    <article
      className={`${className + " "}${padding} border bg-white`}
      id={id && id}
    >
      {children}
    </article>
  );
};

export default Card;
