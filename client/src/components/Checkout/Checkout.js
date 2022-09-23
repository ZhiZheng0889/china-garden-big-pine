import React, { useState } from 'react';
import Card from '../Card/Card';
import CheckoutList from './CheckoutList/CheckoutList';
import CheckoutFooter from './CheckoutFooter/CheckoutFooter';
const Checkout = () => {
  const [cart, setCart] = useState([]);
  return (
    <Card padding="p-0">
      <div className="p-3 border-bottom d-flex flex-column w-100">
        <h5>Cart:</h5>
        <CheckoutList cart={cart} setCart={setCart} />
      </div>
      <div className="p-3 d-flex flex-column w-100">
        <h5>Checkout:</h5>
        <CheckoutFooter cart={cart} />
      </div>
    </Card>
  );
};

export default Checkout;
