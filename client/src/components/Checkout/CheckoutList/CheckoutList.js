import React from 'react';
import CheckoutListItem from './CheckoutListItem/CheckoutListItem';
import styles from './CheckoutList.module.css';
import { Cart } from '../../../utils/Cart';
const CheckoutList = ({ cart, setCart }) => {
  if (!cart.length) {
    return <p>Cart is empty...</p>;
  }
  const handleDelete = ({ target }) => {
    const targetIndex = target.getAttribute('data-index');
    setCart((curr) => [...curr.filter((_, index) => index !== targetIndex)]);
  };
  console.log('cart: ', cart);
  return (
    <ul className={styles.list}>
      {Array.isArray(cart) &&
        cart.map((item, index) => {
          return (
            <CheckoutListItem
              key={item.name}
              item={item}
              index={index}
              handleDelete={handleDelete}
            />
          );
        })}
    </ul>
  );
};

export default CheckoutList;
