import React, { useEffect, useState } from 'react';
import { Cart } from '../../../../utils/Cart';
import { formatCost } from '../../../../utils/formatCost';
import { formatSpecialRequest } from '../../../../utils/FormatSpecialRequest';
import { snakeToTitleCase } from '../../../../utils/snakeToTitleCase';
import ChangeQuantityButton from '../../../Button/ChangeQuantityButton/ChangeQuantityButton';
import { isObjectEmpty } from '../../../../utils/isObjectEmpty';
import styles from './CheckoutListItem.module.css';
const CheckoutListItem = ({ item, cart, setCart, index }) => {
  const {
    name,
    description,
    quantity,
    amount = null,
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
    <li className="flex border-b py-3 px-3">
      <div>
        <h4 className={`${styles.header} font-semibold`}>
          {name} {amount && `(${amount})`}
        </h4>
        <p className={styles.description}>{description}</p>
        {!isObjectEmpty(currentOption) && (
          <p>- {snakeToTitleCase(currentOption.option)}</p>
        )}
        {!isObjectEmpty(currentSize) && (
          <p>- {snakeToTitleCase(currentSize.option)}</p>
        )}
        {specialRequest && <p className="specialRequest">"{specialRequest}"</p>}
        <p className={styles.cost}>
          ${Cart.getItemTotal(index, cart).toFixed(2)}
        </p>
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
