import React from 'react';
import styles from './Card.module.css';
const Card = ({ padding, margin, children, width, classes }) => {
  return (
    <article
      className={`${padding} ${margin} ${width} border rounded bg-white ${classes}`}
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
};

export default Card;
