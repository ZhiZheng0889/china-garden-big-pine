import React from "react";
import { Cart } from "../../utils/Cart";
const CartList = ({ cart }) => {
  return (
    <ul>
      {Array.isArray(cart) &&
        cart.map((cartItem, index) => {
          const {
            food: { _id, basePrice, options, sizes, description, spicy, name },
            quantity,
            specialRequest,
            selectedFoodOption,
            selectedFoodSize,
          } = cartItem;
          return (
            <li key={_id + index} className="flex border-b py-3 px-3">
              <div>
                <div className="flex gap-1">
                  <h4 className="font-semibold">{name}</h4>
                  <p>x{quantity}</p>
                </div>

                <p>{description}</p>
                {selectedFoodOption && (
                  <p>
                    - {snakeToTitleCase(options[selectedFoodOption]?.option)}
                  </p>
                )}
                {selectedFoodSize && (
                  <p>- {snakeToTitleCase(sizes[selectedFoodSize]?.option)}</p>
                )}
                {specialRequest && (
                  <p className="specialRequest">"{specialRequest}"</p>
                )}
                <p className="">${Cart.getItemTotal(index, cart).toFixed(2)}</p>
              </div>
            </li>
          );
        })}
    </ul>
  );
};

export default CartList;
