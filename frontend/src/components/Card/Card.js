import React from 'react';
import styles from './Card.module.css';
const Card = (props) => {
  return (
    <article className={`border rounded ${props.padding} ${styles.container}`}>
      {props.children}
    </article>
  );
};

export default Card;

Card.defaultProps = {
  padding: 'p-3',
};
