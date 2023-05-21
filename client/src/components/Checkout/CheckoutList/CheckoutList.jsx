import React from "react";
import CheckoutListItem from "./CheckoutListItem/CheckoutListItem";
import styles from "./CheckoutList.module.css";
import { Cart } from "../../../utils/Cart";
const CheckoutList = ({ cart, setCart }) => {
  if (!cart.length) {
    return <p className="p-3">Cart is empty...</p>;
  }
  const clearCart = () => {
    Cart.clearCart(setCart);
  };
  return (
    <>
      <ul className={styles.list}>
        {Array.isArray(cart) &&
          cart.map((item, index) => {
            return (
              <CheckoutListItem
                key={item.name + index}
                item={item}
                cart={cart}
                setCart={setCart}
                index={index}
              />
            );
          })}
      </ul>
      {Array.isArray(cart) && cart.length > 0 && (
        <div className="smallscreen-and-landscape-condition px-3">
          <button
            className="ml-auto text-center p-2 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white rounded mt-2"
            onClick={clearCart}
          >
            Clear Cart
          </button>
        </div>
      )}
    </>
  );
};

export default CheckoutList;
