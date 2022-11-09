import React from 'react';
import CheckoutListItem from './CheckoutListItem/CheckoutListItem';
import styles from './CheckoutList.module.css';
import { Cart } from '../../../utils/Cart';
const CheckoutList = ({ cart, setCart }) => {
  if (!cart.length) {
    return <p>Cart is empty...</p>;
  }
  console.log('cart: ', cart);
  return (
    <ul className={styles.list}>
      {Array.isArray(cart) &&
        cart.map((item) => {
          return (
            <CheckoutListItem
              key={item.name}
              item={item}
              cart={cart}
              setCart={setCart}
            />
          );
        })}
    </ul>
  );
};

export default CheckoutList;
