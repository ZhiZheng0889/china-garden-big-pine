import React from "react";
const FLORIDA_TAX = parseFloat(import.meta.env.VITE_FLORIDA_TAX);
import { formatCost } from "../../../utils/formatCost";
import dayjs from "dayjs";
const OrderFooter = ({ order }) => {
  const tax = order?.cart.total * FLORIDA_TAX;
  const day = dayjs(order?.createdAt);
  return (
    order?.cart.total > 0 && (
      <section className="flex flex-col gap-0">
        <div className="p-3">
          <h3 className="text-lg font-semibold">Info</h3>
        </div>

        <div className="flex flex-col gap-3 border-b pl-3 pr-3 pb-3">
          <div className="flex flex-col gap-0">
            <p className="font-semibold">Name</p>
            {order?.name}
          </div>
          <div className="flex flex-col gap-0">
            <p className="font-semibold">Phone Number</p>
            {order?.phoneNumber}
          </div>
          {order?.comment && (
            <div className="flex flex-col gap-0">
              <p className="font-semibold">Comment</p>
              {order?.comment}
            </div>
          )}
          {order?.pickupTime ? (
            <div className="flex flex-col gap-0">
              <p className="font-semibold">Custom Pickup Time</p>
              {order?.pickupTime}
            </div>
          ) : (
            <>
              <div>
                <p className="font-semibold">Pickup Time</p>
                Approximately 15-25 minutes
              </div>
              <div>
                <p className="font-semibold">Order Created</p>
                {day.format("h:mm A")}
              </div>
            </>
          )}
        </div>
        <div className="flex flex-col gap-3 p-3">
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
