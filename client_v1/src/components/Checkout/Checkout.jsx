import React, { useState } from "react";
import Card from "../Card/Card";

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const [error, setError] = useState(null);
  return (
    <Card padding="p-0">
      <header className="p-3 border-b">
        <h3 className="font-semibold">Cart</h3>
      </header>
      {!error && cart.length === 0 ? (
        <p className="font-semibold p-3">Cart is empty...</p>
      ) : error ? (
        <p className="font-semibold p-3">Error retrieving cart</p>
      ) : (
        <p>Cart</p>
      )}
    </Card>
  );
};

export default Checkout;
