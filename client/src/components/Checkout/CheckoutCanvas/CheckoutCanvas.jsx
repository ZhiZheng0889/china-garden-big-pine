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
    isCheckoutOpen && (
      <>
        <div className="modalBackdrop z-30" onClick={closeCanvas}></div>
        <Card
          classes={`z-50 w-full sm:w-9/12 md:w-7/12 lg:w-5/12 top-0 bottom-0 text-black h-screen overflow-y-scroll fixed ${
            isCheckoutOpen ? "right-0" : "left-full hidden"
          }`}
          borderRadius=""
          padding="p-0"
        >
          <div className="flex border-b p-3">
            <button
              className="p-2 w-8 h-8 flex justify-center items-center hover:bg-neutral-100 rounded active:bg-neutral-200 duration-200 ease-out  focus:outline outline-2 outline-offset-2 outline-red-600"
              onClick={closeCanvas}
              autoFocus={true}
            >
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
      </>
    )
  );
};

export default CheckoutCanvas;
