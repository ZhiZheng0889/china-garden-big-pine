import React from "react";
import ButtonWhite from "../ButtonWhite/ButtonWhite";
import { useSelector } from "react-redux";

const ButtonCheckout = ({ className = "" }) => {
  const { cart } = useSelector((state) => state.cart);

  return (
    <ButtonWhite
      className={`rounded-full text-black${className && " " + className}`}
    >
      <i class="fa-solid fa-cart-shopping"></i> 0
    </ButtonWhite>
  );
};

export default ButtonCheckout;
