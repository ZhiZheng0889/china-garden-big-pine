import React from "react";
import { formatCost } from "../../../../utils/formatCost";
import CartReducer from "../../../../utils/CartReducer";

const OrderListItem = ({ item }) => {
  console.log("ITEM: ", item);
  return (
    <div className="p-0 border-b flex justify-between">
      <div className="p-3">
        <p className="font-semibold">
          {item.food.name} <span className="font-normal">x{item.quantity}</span>
        </p>
        {item.specialRequest && <p>"{item.specialRequest}"</p>}
        {item.selectedSize && <p>-{item.food.sizes[item.selectedSize].size}</p>}
        {item.selectedOption && (
          <p>-{item.food.options[item.selectedOption].option}</p>
        )}
        <p>${formatCost(CartReducer.getItemTotal(item))}</p>
      </div>
    </div>
  );
};

export default OrderListItem;
