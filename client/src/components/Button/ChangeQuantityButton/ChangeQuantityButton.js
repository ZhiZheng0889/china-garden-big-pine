import React, { useState } from 'react';
import ActiveChangeQuantityButton from './ActiveChangeQuantityButton/ActiveChangeQuantityButton';
import styles from './ChangeQuantityButton.module.css';
const ChangeQuantityButton = ({ quantity }) => {
  const [isOpen, setIsOpen] = useState(false);
  console.log(isOpen);
  return isOpen ? (
    <ActiveChangeQuantityButton quantity={quantity} />
  ) : (
    <button
      className={styles.button}
      onClick={() => setIsOpen((curr) => !curr)}
    >
      {quantity}x
    </button>
  );
};

export default ChangeQuantityButton;
