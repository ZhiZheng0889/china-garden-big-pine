import React from 'react';
import Card from '../Card/Card';
import CheckoutFooter from './CheckoutFooter';
import CheckoutList from './CheckoutList';
const Checkout = () => {
  return (
    <Card>
      <div className="p-3 border-bottom">
        <CheckoutList />
      </div>
      <div className="p-3">
        <CheckoutFooter />
      </div>
    </Card>
  );
};

export default Checkout;
