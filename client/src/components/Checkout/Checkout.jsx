import React, { useState, useEffect } from "react";
import Card from "../Card/Card";
import CheckoutList from "./CheckoutList/CheckoutList";
import CheckoutFooter from "./CheckoutFooter/CheckoutFooter";
import dayjs from "dayjs";
import { HoursApi } from "../../api/hoursApi";
import { isOpen } from "../../utils/isOpen";
// Replace this function with the actual implementation to fetch operation data
const fetchOperationData = () => {
  // Implement fetching operation data here
};

const Checkout = ({ cart, setCart, hideButton, setIsCheckoutOpen }) => {
  const [storeHours, setStoreHours] = useState(null);
  let storeIsOpen = null;
  useEffect(() => {
    (async () => {
      const currentTime = new Date().toLocaleString("en-US", {
        timeZone: "America/New_York",
      });
      const formattedTime = dayjs(currentTime).format("YYYY-MM-DD");
      const foundHours = await HoursApi.getDailyHours(formattedTime);
      setStoreHours(foundHours);
    })();
  }, []);
  if (storeHours) {
    storeIsOpen = isOpen(storeHours);
    if (import.meta.env.VITE_NODE_ENV === "development") {
      storeIsOpen = true;
    }
  }

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
            hideButton={!storeIsOpen || hideButton}
            setIsCheckoutOpen={setIsCheckoutOpen}
          />
        </div>
      )}
      {!storeIsOpen && (
        <p className="p-3 font-semibold border-t mt-3">
          Sorry we are currently closed. Please view our home page for opening
          hours.
        </p>
      )}
    </>
  );
};

Checkout.defaultProps = {
  hideButton: false,
};

export default Checkout;
