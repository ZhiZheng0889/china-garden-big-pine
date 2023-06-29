import React, { useState } from "react";
import Card from "../Card/Card";
import { useSelector } from "react-redux";
import CheckoutList from "./CheckoutList/CheckoutList";
import CheckoutFooter from "./CheckoutFooter/CheckoutFooter";

const Checkout = () => {
  const { cart } = useSelector((state) => state.cart);
  console.log("CART:", cart);
  const [error, setError] = useState(null);
  return (
    <Card padding="p-0">
      <header className="p-3 border-b">
        <h3 className="font-semibold">Cart</h3>
      </header>
      {!error && cart.length === 0 ? (
        <p className="font-semibold p-3">Cart is empty...</p>
      ) : (
        <CheckoutList />
      )}
      <CheckoutFooter total={cart.total} />
    </Card>
  );
};

export default Checkout;
