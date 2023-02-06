import React from 'react';
import Card from '../../Card/Card';
import Checkout from '../Checkout';

const CheckoutCanvas = ({
  cart,
  setCart,
  isCheckoutOpen,
  setIsCheckoutOpen,
}) => {
  console.log(isCheckoutOpen);
  const closeCanvas = () => {
    setIsCheckoutOpen(false);
  };
  return (
    <Card
      classes={`z-50 w-7/12 top-0 h-screen absolute text-black ${
        isCheckoutOpen ? 'right-0 block' : 'left-full hidden'
      }`}
    >
      <div className="flex">
        <button className="ml-auto p-1" onClick={closeCanvas}>
          <i class="fa-solid fa-x" onClick={closeCanvas}></i>
        </button>
      </div>
      <Checkout cart={cart} setCart={setCart} />
    </Card>
  );
};

export default CheckoutCanvas;
