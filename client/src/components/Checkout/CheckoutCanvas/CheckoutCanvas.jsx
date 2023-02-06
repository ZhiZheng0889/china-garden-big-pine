import React from 'react';
import Checkout from '../Checkout';

const CheckoutCanvas = ({
  cart,
  setCart,
  isCheckoutOpen,
  setIsCheckoutOpen,
}) => {
  console.log(isCheckoutOpen);
  return (
    <div
      className={`z-50 w-7/12 top-0 h-screen absolute text-black ${
        isCheckoutOpen ? 'right-0' : 'left-full'
      }`}
    >
      <Checkout cart={cart} setCart={setCart} />
    </div>
  );
};

export default CheckoutCanvas;
