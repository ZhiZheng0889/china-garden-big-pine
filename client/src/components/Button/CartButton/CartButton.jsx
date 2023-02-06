import React from 'react';
import styles from './CartButton.module.css';
const CartButton = ({ cart, setIsCheckoutOpen }) => {
  const toggleCheckout = () => {
    setIsCheckoutOpen((c) => !c);
  };
  return (
    <button
      className="text-black px-4 rounded-full py-1  bg-white"
      aria-label={
        `${Array.isArray(cart) && cart.length}` +
        ' items in cart, open Order Cart'
      }
      onClick={toggleCheckout}
    >
      <i className="fa-solid fa-cart-shopping fa-lg mr-2"> </i>
      {Array.isArray(cart) && cart.length}
    </button>
  );
};

export default CartButton;
