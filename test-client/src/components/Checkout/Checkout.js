import React, { useState } from 'react';
import Card from '../Card/Card';
import CheckoutList from './CheckoutList/CheckoutList';
import CheckoutFooter from './CheckoutFooter/CheckoutFooter';
const Checkout = ({ cart, setCart }) => {
  return (
    <Card padding="p-0">
      <div className="p-3 border-bottom d-flex flex-column w-100">
        <h3 className="text-lg font-semibold">Cart</h3>
        <CheckoutList cart={cart} setCart={setCart} />
      </div>
      {cart.length > 0 && (
        <div className="p-3 d-flex flex-column w-100">
          <h3 className="text-lg font-semibold">Checkout</h3>
          <CheckoutFooter cart={cart} />
        </div>
      )}
    </Card>
  );
};

export default Checkout;
