import React from 'react';
import Card from '../Card/Card';
import CheckoutFooter from './CheckoutFooter';
import CheckoutList from './CheckoutList';
const Checkout = ({ cart, setCart }) => {
  return (
    <Card>
      <div className="p-3 border-bottom">
        <h5>Cart:</h5>
        <CheckoutList cart={cart} setCart={setCart} />
      </div>
      <div className="p-3">
        <h5>Checkout:</h5>
        <CheckoutFooter cart={cart} />
      </div>
    </Card>
  );
};

export default Checkout;
