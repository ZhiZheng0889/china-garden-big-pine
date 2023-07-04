import React from "react";
const FLORIDA_TAX = parseFloat(import.meta.env.VITE_FLORIDA_TAX);

import { formatCost } from "../../../utils/formatCost";
const OrderFooter = ({ order }) => {
  const tax = order?.cart.total * FLORIDA_TAX;
  return (
    order?.cart.total > 0 && (
      <section className="p-3 flex flex-col gap-3">
        <h3 className="text-lg font-semibold">Info</h3>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-0">
            <p className="font-semibold">Name</p>
            {order?.name}
          </div>
          <div className="flex flex-col gap-0">
            <p className="font-semibold">Phone Number</p>
            {order?.phoneNumber}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-semibold">Total</h3>
          <div>
            <div className="flex items-center">
              <p>Sub Total: </p>
              <p className="ml-auto">${formatCost(order?.cart.total)}</p>
            </div>
            <div className="flex items-center">
              <p>Tax: </p>
              <p className="ml-auto">${formatCost(tax)}</p>
            </div>
            <div className="flex items-center">
              <p>Total: </p>
              <p className="ml-auto font-semibold">
                ${formatCost(order?.cart.total + tax)}
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  );
};

export default OrderFooter;
