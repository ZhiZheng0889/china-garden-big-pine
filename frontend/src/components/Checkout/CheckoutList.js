import React from 'react';
import CheckoutListCard from './CheckoutListCard';
import styles from './CheckoutList.module.css';
const CheckoutList = ({ cart, setCart }) => {
  const cartList =
    Array.isArray(cart) &&
    cart.map((item, index) => {
      return (
        <CheckoutListCard
          item={item}
          key={item.name + index}
          index={index}
          setCart={setCart}
          cart={cart}
        />
      );
    });
  if (cartList.length > 0) {
    return <ul className={styles.list}>{cartList}</ul>;
  }
  return <p>Nothing in Cart</p>;
};

export default CheckoutList;
