import React, { useEffect, useState } from 'react';
import { Cart } from '../../../../utils/Cart';
import { formatSpecialRequest } from '../../../../utils/FormatSpecialRequest';
import { snakeToTitleCase } from '../../../../utils/snakeToTitleCase';
import ChangeQuantityButton from '../../../Button/ChangeQuantityButton/ChangeQuantityButton';
import styles from './CheckoutListItem.module.css';
const CheckoutListItem = ({ item, cart, setCart, index }) => {
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
    Cart.remove(index, setCart);
  };

  const updateQuantity = (amount) => {
    Cart.updateQuantity(index, amount, cart, setCart);
  };
  return (
    <li className="flex border-b py-1">
      <div>
        <h4 className={`${styles.header} font-semibold`}>
          {name} {amount && `(${amount})`}
        </h4>
        <p className={styles.description}>{description}</p>
        {currentOption && <p>{snakeToTitleCase(currentOption)}</p>}
        {currentSize && <p>{snakeToTitleCase(currentSize)}</p>}
        {specialRequest && <p className="specialRequest">"{specialRequest}"</p>}
        <p className={styles.cost}>${total}</p>
      </div>
      <div className="ml-auto">
        <ChangeQuantityButton
          quantity={quantity}
          updateQuantity={updateQuantity}
          handleDelete={handleDelete}
        />
      </div>

      {/* <button className={styles.buttonDelete} onClick={handleDelete}>
        {<i className="fa-solid fa-trash"></i>}
      </button> */}
    </li>
  );
};

export default CheckoutListItem;
