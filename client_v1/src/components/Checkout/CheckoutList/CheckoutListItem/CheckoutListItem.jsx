import React from "react";
import CartReducer from "../../../../utils/CartReducer";
import { formatCost } from "../../../../utils/formatCost";
import ButtonQuantity from "../../../Button/ButtonQuantity/ButtonQuantity";

const CheckoutListItem = ({ item, setError, index, cartId }) => {
  return (
    <div className="p-3 border-b flex justify-between">
      <div>
        <p className="font-semibold">{item.food.name}</p>
        <p>${formatCost(CartReducer.getItemTotal(item))}</p>
      </div>
      <div className="flex flex-col items-end gap-3 p-2">
        <ButtonQuantity
          item={item}
          setError={setError}
          index={index}
          cartId={cartId}
        />
        <button className="text-underline underline-offset-2 mt-auto">
          Edit
        </button>
      </div>
    </div>
  );
};

export default CheckoutListItem;
