import React from 'react';
import styles from './Card.module.css';
const Card = ({ padding, margin, children, width }) => {
  return (
    <article
      className={`${styles.card} ${padding} ${margin} ${width} border broder-rounded bg-white`}
    >
      {children}
    </article>
  );
};

Card.defaultProps = {
  padding: 'p-3',
  margin: 'm-0',
  width: '',
};

export default Card;
