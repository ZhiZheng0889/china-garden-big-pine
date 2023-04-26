import React from "react";
import styles from "./Card.module.css";
const Card = ({
  padding,
  margin,
  children,
  width,
  classes,
  borderRadius,
  isNotRoundedMobile,
}) => {
  return (
    <article
      className={`${padding} ${margin} ${width} border ${
        isNotRoundedMobile ? `sm:${borderRadius}` : borderRadius
      } bg-white ${classes}`}
    >
      {children}
    </article>
  );
};

Card.defaultProps = {
  padding: "p-3",
  margin: "m-0",
  width: "",
  classes: "",
  borderRadius: "rounded",
  isNotRoundedMobile: false,
};

export default Card;
