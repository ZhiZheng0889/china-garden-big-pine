import React from 'react';
const CheckoutFooter = () => {
  return (
    <section>
      <div className="sub-total d-flex">
        <p>Sub Total: </p>
        <p className="ms-auto">$53.45</p>
      </div>
      <div className="total d-flex">
        <p>Sub Total: </p>
        <p className="ms-auto">$53.99</p>
      </div>
      <div className="checkoutBtn">
        <button className="btn btn-main btn-normal w-100">Checkout</button>
      </div>
    </section>
  );
};

export default CheckoutFooter;
