import React from "react";
import ButtonWhite from "../ButtonWhite/ButtonWhite";
import { useSelector } from "react-redux";

const ButtonCheckout = ({ className = "" }) => {
  const { cart } = useSelector((state) => state.cart);

  return (
    <ButtonWhite
      className={`xl:hidden rounded-full text-black${
        className && " " + className
      }`}
      padding="py-1"
    >
      <i class="fa-solid fa-cart-shopping"></i>{" "}
      {cart ? cart?.items?.length ?? 0 : 10}
    </ButtonWhite>
  );
};

export default ButtonCheckout;
