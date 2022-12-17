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
    total,
    option,
    size,
    currentOption,
    currentSize,
    specialRequest = '',
  } = item;
  const handleDelete = () => {
    Cart.remove(item, cart, setCart);
  };
  console.log(item);
  return (
    <li className={styles.li}>
      <button className={styles.button}>{quantity}x</button>
      <div>
        <h4 className={styles.header}>
          {name} {amount && `(${amount})`}
        </h4>
        <p className={styles.description}>{description}</p>
        {currentOption && <p>-{currentOption}</p>}
        {currentSize && <p>-{currentSize}</p>}
        {specialRequest && <p className="specialRequest">"{specialRequest}"</p>}
        <p className={styles.cost}>${total}</p>
      </div>
      <button className={styles.buttonDelete} onClick={handleDelete}>
        {<i className="fa-solid fa-trash fa-lg"></i>}
      </button>
    </li>
  );
};

export default CheckoutListItem;
