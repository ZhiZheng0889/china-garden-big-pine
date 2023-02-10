import React from 'react';
import Card from '../../Card/Card';
import Checkout from '../Checkout';

const CheckoutCanvas = ({
  cart,
  setCart,
  isCheckoutOpen,
  setIsCheckoutOpen,
}) => {
  const closeCanvas = () => {
    setIsCheckoutOpen(false);
  };
  return (
    <div
      className={`z-30 ease-out duration-300 ${
        isCheckoutOpen ? 'right-0 block' : 'left-full hidden'
      }`}
    >
      <div className="modalBackdrop"></div>
      <Card
        classes={`z-50 w-5/12 top-0 h-screen absolute text-black ${
          isCheckoutOpen ? 'right-0 block' : 'left-full hidden'
        }`}
        borderRadius=""
        padding="p-0"
      >
        <div className="flex border-b p-3">
          <button className="p-1" onClick={closeCanvas}>
            <i className="fa-solid fa-x" onClick={closeCanvas}></i>
          </button>
        </div>
        <Checkout cart={cart} setCart={setCart} />
      </Card>
    </div>
  );
};

export default CheckoutCanvas;
