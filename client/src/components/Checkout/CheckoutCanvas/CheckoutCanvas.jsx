import React from 'react';
import Checkout from '../Checkout';

const CheckoutCanvas = ({ cart, setCart }) => {
  return (
    <div className="absolute left-full">
      <Checkout cart={cart} setCart={setCart} />
    </div>
  );
};

export default CheckoutCanvas;
