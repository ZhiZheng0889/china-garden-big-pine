import React from 'react';
import styles from './CartButton.module.css';
const CartButton = ({ cart, setIsCheckoutOpen }) => {
  return (
    <button
      className={`${styles.button}`}
      aria-label={
        `${Array.isArray(cart) && cart.length}` +
        ' items in cart, open Order Cart'
      }
      onClick={() => setIsCheckoutOpen((curr) => !curr)}
    >
      <i className="fa-solid fa-cart-shopping fa-lg"> </i>
      {Array.isArray(cart) && cart.length}
    </button>
  );
};

export default CartButton;
