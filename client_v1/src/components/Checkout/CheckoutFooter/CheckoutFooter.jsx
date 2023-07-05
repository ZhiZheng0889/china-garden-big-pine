import React, { useState, useEffect } from "react";
import { formatCost } from "../../../utils/formatCost";
import dayjs from "dayjs";
import { isOpen } from "../../../utils/isOpen";
import Hours from "../../../api/Hours";
import ButtonPrimary from "../../Button/ButtonPrimary/ButtonPrimary";

const FLORIDA_TAX = parseFloat(import.meta.env.VITE_FLORIDA_TAX);
const CheckoutFooter = ({ total, isButtonHiding, closeModal = () => {} }) => {
  const tax = total * FLORIDA_TAX;
  const [storeHours, setStoreHours] = useState(null);
  let storeIsOpen = null;
  useEffect(() => {
    (async () => {
      const currentTime = new Date().toLocaleString("en-US", {
        timeZone: "America/New_York",
      });
      const formattedTime = dayjs(currentTime).format("YYYY-MM-DD");
      const response = await Hours.getDailyHours(formattedTime);
      if (response.data) {
        setStoreHours(response.data);
      }
    })();
  }, []);
  if (storeHours) {
    storeIsOpen = isOpen(storeHours);
    if (import.meta.env.VITE_NODE_ENV === "development") {
      storeIsOpen = true;
    }
  }
  return (
    total > 0 && (
      <section className="p-3 flex flex-col gap-3">
        <h3 className="text-lg font-semibold">Checkout</h3>
        <div>
          <div className="flex items-center">
            <p>Sub Total: </p>
            <p className="ml-auto">${formatCost(total)}</p>
          </div>
          <div className="flex items-center">
            <p>Tax: </p>
            <p className="ml-auto">${formatCost(tax)}</p>
          </div>
          <div className="flex items-center">
            <p>Total: </p>
            <p className="ml-auto font-semibold">${formatCost(total + tax)}</p>
          </div>
        </div>
        {!isButtonHiding &&
          (storeIsOpen ? (
            <ButtonPrimary
              width="w-full text-center"
              link="/checkout"
              onClick={closeModal}
            >
              Checkout
            </ButtonPrimary>
          ) : (
            <p>
              The store is currently closed. Please check the homepage for
              opening hours.
            </p>
          ))}
      </section>
    )
  );
};

export default CheckoutFooter;
