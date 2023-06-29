import React from "react";
const FLORIDA_TAX = parseInt(import.meta.env.VITE_FLORIDA_TAX);
const CheckoutFooter = ({ total }) => {
  return (
    <section>
      <div>
        <p>Sub Total: </p>
        <p>${total}</p>
      </div>
      <div>
        <p>Tax: </p>
        <p>${FLORIDA_TAX}</p>
      </div>
      <div>
        <p>Total: </p>
        <p>${total}</p>
      </div>
    </section>
  );
};

export default CheckoutFooter;
