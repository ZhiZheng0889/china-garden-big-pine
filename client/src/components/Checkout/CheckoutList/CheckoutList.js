import React from 'react';

const CheckoutList = ({ cart, setCart }) => {
  if (!cart.length) {
    return <p>Cart is empty...</p>;
  }
};

export default CheckoutList;
