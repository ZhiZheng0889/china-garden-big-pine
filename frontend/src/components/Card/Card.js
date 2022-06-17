import React from 'react';
import styles from './Card.module.css';
const Card = (props) => {
  return (
    <article className={`border rounded ${styles.container}`}>
      {props.children}
    </article>
  );
};

export default Card;
