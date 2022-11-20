import React, { useEffect, useState } from 'react';
import { Cart } from '../../../../utils/Cart';
import { formatSpecialRequest } from '../../../../utils/FormatSpecialRequest';
import styles from './CheckoutListItem.module.css';
const CheckoutListItem = ({ item, cart, setCart }) => {
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
    setCost(price[0] * quantity);
  }, [quantity, price]);

  const handleDelete = () => {
    Cart.remove(item, cart, setCart);
  };

  return (
    <li className={styles.li}>
      <button className={styles.button}>{quantity}x</button>
      <div>
        <h4 className={styles.header}>
          {name} {amount && `(${amount})`}
        </h4>
        <p className={styles.description}>{description}</p>
        {specialRequest && <p className="specialRequest">"{specialRequest}"</p>}
        <p className={styles.cost}>${cost}</p>
      </div>
      <button className={styles.buttonDelete} onClick={handleDelete}>
        {<i className="fa-solid fa-trash fa-lg"></i>}
      </button>
    </li>
  );
};

export default CheckoutListItem;
