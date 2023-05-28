// Checkout.jsx
import React from "react";
import Card from "../Card/Card";
import CheckoutList from "./CheckoutList/CheckoutList";
import CheckoutFooter from "./CheckoutFooter/CheckoutFooter";
import CheckoutCustomerComment from "./CheckoutCustomerComment/CheckoutCustomerComment"; // Import the new component

const Checkout = ({ cart, setCart, hideButton, setIsCheckoutOpen }) => {
  return (
    <>
      <div className="smallscreen-pb border-bottom d-flex flex-column w-100">
        <header className="p-3 border-b">
          <h3 className="text-lg font-semibold">Cart</h3>
        </header>

        <CheckoutList cart={cart} setCart={setCart} />
      </div>
      {cart.length > 0 && (
        <div className="px-3 smallscreen-pt d-flex flex-column w-100">
          <h3 className="text-lg font-semibold">Checkout</h3>
          <CheckoutFooter
            cart={cart}
            hideButton={hideButton}
            setIsCheckoutOpen={setIsCheckoutOpen}
          />
          <CheckoutCustomerComment /> {/* Use the new component */}
        </div>
      )}
    </>
  );
};

Checkout.defaultProps = {
  hideButton: false,
};

export default Checkout;
