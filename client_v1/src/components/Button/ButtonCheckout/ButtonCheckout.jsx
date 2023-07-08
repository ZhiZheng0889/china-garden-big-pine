import React from "react";
import ButtonWhite from "../ButtonWhite/ButtonWhite";
import { useSelector } from "react-redux";
import CartReducer from "../../../utils/CartReducer";

const ButtonCheckout = ({ className = "", onClick }) => {
  const { cart } = useSelector((state) => state.cart);

  return (
    <ButtonWhite
      className={`outline-white xl:hidden rounded-full text-black${
        className && " " + className
      }`}
      padding="py-1"
      onClick={onClick}
    >
      <i className="fa-solid fa-cart-shopping"></i>{" "}
      {CartReducer.getCartTotalQuantity(cart)}
    </ButtonWhite>
  );
};

export default ButtonCheckout;
