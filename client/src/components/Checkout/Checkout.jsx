import React, { useState, useEffect } from "react";
import Card from "../Card/Card";
import CheckoutList from "./CheckoutList/CheckoutList";
import CheckoutFooter from "./CheckoutFooter/CheckoutFooter";

// Replace this function with the actual implementation to fetch operation data
const fetchOperationData = () => {
  // Implement fetching operation data here
};

const Checkout = ({ cart, setCart, hideButton, setIsCheckoutOpen }) => {
  const [operationData, setOperationData] = useState(null);
  const [isBusinessOpen, setIsBusinessOpen] = useState(true);

  useEffect(() => {
    // fetchOperationData()
    //   .then(data => setOperationData(data))
    //   .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    if (operationData) {
      let currentTime = new Date().toLocaleString("en-US", { timeZone: "America/New_York" });
      let currentHour = new Date(currentTime).getHours();
      let currentDay = new Date(currentTime).getDay();
      let currentDate = new Date(currentTime).toISOString().split("T")[0];
      let businessStartHour = operationData.startHour;
      let businessEndHour = operationData.endHour;
      let closedDays = operationData.closedDays;
      let holidays = operationData.holidays;
      let isDevMode = operationData.isDevMode;

      if (isDevMode || (currentHour >= businessStartHour && currentHour < businessEndHour && !closedDays.includes(currentDay) && !holidays.includes(currentDate))) {
        setIsBusinessOpen(true);
      } else {
        setIsBusinessOpen(false);
      }
    }
  }, [operationData]);

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
