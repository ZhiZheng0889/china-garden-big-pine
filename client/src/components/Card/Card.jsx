import React from 'react';
import styles from './Card.module.css';
const Card = ({ padding, margin, children, width, classes, borderRadius }) => {
  return (
    <article
      className={`${padding} ${margin} ${width} border ${borderRadius} bg-white ${classes}`}
    >
      {children}
    </article>
  );
};

Card.defaultProps = {
  padding: 'p-3',
  margin: 'm-0',
  width: '',
  classes: '',
  borderRadius: 'rounded',
};

export default Card;
