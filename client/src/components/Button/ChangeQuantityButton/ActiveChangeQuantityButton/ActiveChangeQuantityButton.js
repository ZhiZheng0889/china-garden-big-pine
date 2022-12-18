import React from 'react';
import styles from './ActiveChangeQuantityButton.module.css';
const ActiveChangeQuantityButton = ({ quantity }) => {
  return <div className={styles.button}>- {quantity} +</div>;
};

export default ActiveChangeQuantityButton;
