import React, { useEffect, useState } from 'react';
import styles from './CheckoutListItem.module.css';
const CheckoutListItem = ({ item }) => {
  const { name, description, quantity, amount = null, price } = item;
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
        <p className={styles.cost}>${cost}</p>
      </div>
      <button className={styles.buttonDelete}>
        {<i className="fa-solid fa-trash fa-lg"></i>}
      </button>
    </li>
  );
};

export default CheckoutListItem;
