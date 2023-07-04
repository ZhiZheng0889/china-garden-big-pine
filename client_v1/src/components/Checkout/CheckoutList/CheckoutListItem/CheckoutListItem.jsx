import React from "react";
import CartReducer from "../../../../utils/CartReducer";
import { formatCost } from "../../../../utils/formatCost";
import ButtonQuantity from "../../../Button/ButtonQuantity/ButtonQuantity";

const CheckoutListItem = ({ item, setError, index, cartId }) => {
  console.log("FINAL ITEM: ", item);
  console.log(item?.food?.options[item?.selectedOption]);
  if (item.selectedOption) {
    console.log(
      "==========>",
      item?.food?.options[item?.selectedOption].option
    );
  }
  return (
    <div className="p-0 border-b flex justify-between">
      <div className="p-3">
        <p className="font-semibold">{item.food.name}</p>
        {item.specialRequest && <p>"{item.specialRequest}"</p>}
        {(item.selectedSize || item.selectedSize === 0) && (
          <p className="leading-4">
            -{item.food.sizes[item.selectedSize].size}
          </p>
        )}
        {(item.selectedOption || item.selectedOption === 0) && (
          <p className="leading-4">
            - {item.food.options[item.selectedOption].option}
          </p>
        )}
        <p>${formatCost(CartReducer.getItemTotal(item))}</p>
      </div>
      <div className="flex flex-col items-end gap-1">
        <div className="p-3">
          <ButtonQuantity
            item={item}
            setError={setError}
            index={index}
            cartId={cartId}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckoutListItem;
