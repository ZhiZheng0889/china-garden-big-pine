import React, { useState, useEffect } from "react";
import Card from "../Card/Card";
import CheckoutList from "./CheckoutList/CheckoutList";
import CheckoutFooter from "./CheckoutFooter/CheckoutFooter";

const Checkout = ({ cart, setCart, hideButton, setIsCheckoutOpen }) => {
  const [isBusinessOpen, setIsBusinessOpen] = useState(true);

  useEffect(() => {
    let currentTime = new Date().toLocaleString("en-US", { timeZone: "America/New_York" });
    let currentHour = new Date(currentTime).getHours();
    let currentDay = new Date(currentTime).getDay();
    let businessStartHour = 11; // Start hour of your business
    let businessEndHour = 21.5; // End hour of your business, 9:30 PM is 21.5 in 24 hour format
    let closedDay = 0; // Sunday

    if (currentHour < businessStartHour || currentHour >= businessEndHour || currentDay === closedDay) {
      setIsBusinessOpen(false);
    } else {
      setIsBusinessOpen(true);
    }
  }, []);

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
            hideButton={!isBusinessOpen || hideButton}
            setIsCheckoutOpen={setIsCheckoutOpen}
          />
        </div>
      )}
      {!isBusinessOpen && <p>Sorry, our business is currently closed. We are open Monday to Saturday, from 11:00 AM to 9:30 PM (Florida time).</p>}
    </>
  );
};

Checkout.defaultProps = {
  hideButton: false,
};

export default Checkout;
