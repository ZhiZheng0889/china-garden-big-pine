import React, { useEffect, useState } from 'react';
import styles from './CheckoutListItem.module.css';
const CheckoutListItem = ({ item, index, handleDelete }) => {
  const {
    name,
    description,
    quantity,
    amount = null,
    price,
    specialRequest = '',
  } = item;
  const [cost, setCost] = useState(0);
  useEffect(() => {
    setCost(price * quantity);
  }, [quantity, price]);
  return (
    <li className={styles.li}>
      <button className={styles.button}>{quantity}x</button>
      <div>
        <h4 className={styles.header}>
          {name} {amount && `(${amount})`}
        </h4>
        <p className={styles.description}>{description}</p>
        {specialRequest && (
          <p className={styles.specialRequest}>"{specialRequest}"</p>
        )}
        <p className={styles.cost}>${cost}</p>
      </div>
      <button
        className={styles.buttonDelete}
        data-index={index}
        onClick={handleDelete}
      >
        {<i className="fa-solid fa-trash fa-lg" data-index={index}></i>}
      </button>
    </li>
  );
};

export default CheckoutListItem;
