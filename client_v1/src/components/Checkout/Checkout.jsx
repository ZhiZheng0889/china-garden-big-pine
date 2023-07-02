import React, { useState } from "react";
import Card from "../Card/Card";
import { useSelector } from "react-redux";
import CheckoutList from "./CheckoutList/CheckoutList";
import CheckoutFooter from "./CheckoutFooter/CheckoutFooter";
import ErrorAlert from "../../errors/ErrorAlert";

const Checkout = () => {
  const { cart } = useSelector((state) => state.cart);
  const [error, setError] = useState(null);
  return (
    <Card padding="p-0" id="checkout-card">
      <header className="p-3 border-b">
        <h3 className="text-lg font-semibold">Cart</h3>
      </header>
      <ErrorAlert
        error={error}
        setError={setError}
        showClose
        className="m-2 p-3"
      />
      {!error && cart.length === 0 ? (
        <p className="font-semibold p-3">Cart is empty...</p>
      ) : (
        <CheckoutList
          cartItems={cart.items}
          setError={setError}
          cartId={cart._id}
        />
      )}
      <CheckoutFooter total={cart.total} />
    </Card>
  );
};

export default Checkout;
