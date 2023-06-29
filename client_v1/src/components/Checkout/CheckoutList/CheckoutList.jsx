import React from "react";
import CheckoutListItem from "./CheckoutListItem/CheckoutListItem";

const CheckoutList = ({ cartItems }) => {
  if (!cartItems || !cartItems.length) {
    return <p className="p-3">Cart is empty...</p>;
  }
  return (
    <>
      <ul>
        {Array.isArray(cartItems) &&
          cartItems.map((item, index) => {
            const key = item.food.name + index;
            return (
              <li key={key}>
                <CheckoutListItem item={item} />
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default CheckoutList;
