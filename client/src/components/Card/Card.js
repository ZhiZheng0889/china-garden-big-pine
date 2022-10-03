import React from 'react';
import styles from './Card.module.css';
const Card = ({ padding, margin, children }) => {
  return (
    <article
      className={`${styles.card} ${padding} ${margin} border broder-rounded bg-white`}
    >
      {children}
    </article>
  );
};

Card.defaultProps = {
  padding: 'p-3',
  margin: 'm-0',
};

export default Card;
