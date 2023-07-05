import React, { useState } from "react";
import CheckoutListItem from "./CheckoutListItem/CheckoutListItem";
import ButtonPrimary from "../../Button/ButtonPrimary/ButtonPrimary";
import { useDispatch } from "react-redux";
import { updateCart } from "../../../slices/cartSlice";
import ApiErrorHandler from "../../../errors/ApiErrorHandler";
import Cart from "../../../api/Cart";

const CheckoutList = ({ cartItems, setError, cartId }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const clearCart = async () => {
    try {
      setError(null);
      setIsLoading(true);
      const response = await Cart.clearCart(cartId);
      if (response.data) {
        dispatch(updateCart(response.data));
      }
    } catch (err) {
      setError(ApiErrorHandler.handleRequestResponse(err));
    } finally {
      setIsLoading(false);
    }
  };
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
                <CheckoutListItem
                  item={item}
                  setError={setError}
                  index={index}
                  cartId={cartId}
                />
              </li>
            );
          })}
      </ul>
      <ButtonPrimary onClick={clearCart} className="m-3">
        {isLoading ? "Loading..." : "Clear Cart"}
      </ButtonPrimary>
    </>
  );
};

export default CheckoutList;
