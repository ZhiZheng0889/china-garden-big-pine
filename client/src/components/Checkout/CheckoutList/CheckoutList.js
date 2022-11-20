import React from 'react';
import CheckoutListItem from './CheckoutListItem/CheckoutListItem';
import styles from './CheckoutList.module.css';
import { Cart } from '../../../utils/Cart';
const CheckoutList = ({ cart, setCart }) => {
  if (!cart.length) {
    return <p>Cart is empty...</p>;
  }
  return (
    <ul className={styles.list}>
      {Array.isArray(cart) &&
        cart.map((item, index) => {
          return (
            <CheckoutListItem
              key={item.name + index}
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
