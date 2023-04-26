import React, { useEffect } from "react";
import Card from "../../Card/Card";
import Checkout from "../Checkout";

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
      className={`top-0 bottom-0 xl:hidden  z-30 ease-out duration-300 ${
        isCheckoutOpen ? "right-0 block" : "left-full hidden"
      }`}
    >
      <div className="modalBackdrop"></div>
      <Card
        classes={`z-50 w-full sm:w-9/12 md:w-7/12 lg:w-5/12 top-0 bottom-0 text-black h-screen overflow-y-scroll fixed ${
          isCheckoutOpen ? "right-0" : "left-full hidden"
        }`}
        borderRadius=""
        padding="p-0"
      >
        <div className="flex border-b p-3">
          <button className="p-1" onClick={closeCanvas}>
            <i className="fa-solid fa-x" onClick={closeCanvas}></i>
          </button>
        </div>
        <div className="">
          <Checkout
            cart={cart}
            setCart={setCart}
            setIsCheckoutOpen={setIsCheckoutOpen}
          />
        </div>
      </Card>
    </div>
  );
};

export default CheckoutCanvas;
