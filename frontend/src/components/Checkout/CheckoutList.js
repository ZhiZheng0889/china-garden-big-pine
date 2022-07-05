import React from 'react';
import CheckoutListCard from './CheckoutListCard';
import styles from './CheckoutList.module.css';
const CheckoutList = ({ cart, setcart }) => {
  const cartList = cart.map((item, index) => {
    console.log(item);
    return (
      <CheckoutListCard
        item={item}
        key={item.name + index}
        setcart={setcart}
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
