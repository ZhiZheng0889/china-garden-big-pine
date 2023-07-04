import React from "react";
import { Link } from "react-router-dom";
import ButtonClear from "../../Button/ButtonClear/ButtonClear";
import FocusTrap from "focus-trap-react";
import Checkout from "../Checkout";
const CheckoutCanvas = ({ isCheckoutOpen, setIsCheckoutOpen }) => {
  const closeModal = () => {
    console.log("CLOSING");
    setIsCheckoutOpen(false);
  };
  return (
    isCheckoutOpen && (
      <>
        <div
          className="xl:hidden navbar-canvas-backdrop"
          onClick={closeModal}
        ></div>
        <FocusTrap
          focusTrapOptions={{ initialFocus: "#navbar-checkout-header" }}
        >
          <div
            className={`xl:hidden fixed navbar-canvas border-r bg-white w-11/12 sm:w-3/5 md:w-7/12 lg:w-5/12 text-black right-0 top-0 bottom-0 overflow-y-auto duration-200 ease-out`}
          >
            <header className="flex justify-between items-center border-b p-3">
              <Link to="/" onClick={closeModal} id="navbar-checkout-header">
                <h3 className="text-lg font-semibold">China Garden</h3>
              </Link>
              <ButtonClear
                onClick={closeModal}
                width="w-10 h-10"
                className="flex justify-center items-center"
              >
                <i className="fa-solid fa-xmark"></i>
              </ButtonClear>
            </header>
            <Checkout closeModal={closeModal} />
          </div>
        </FocusTrap>
      </>
    )
  );
};

export default CheckoutCanvas;
