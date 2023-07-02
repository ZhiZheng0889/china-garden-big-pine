import React from "react";
import { formatCost } from "../../../utils/formatCost";
import ButtonPrimary from "../../Button/ButtonPrimary/ButtonPrimary";
const FLORIDA_TAX = parseFloat(import.meta.env.VITE_FLORIDA_TAX);
const CheckoutFooter = ({ total }) => {
  const tax = total * FLORIDA_TAX;
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
        <ButtonPrimary width="w-full">Checkout</ButtonPrimary>
      </section>
    )
  );
};

export default CheckoutFooter;
