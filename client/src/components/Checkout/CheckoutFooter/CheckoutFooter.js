import React, { useEffect, useState } from 'react';
const CheckoutFooter = ({ cart }) => {
  const FLORIDA_TAX = 0.06;
  const [subTotal, setSubTotal] = useState(0);
  const [tax, setTax] = useState(FLORIDA_TAX);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    const cartTotal =
      (Array.isArray(cart) &&
        cart.reduce(
          (accumulator, item) => accumulator + item.price * item.quantity,
          0
        )) ||
      0;
    setSubTotal(cartTotal);
  }, [cart]);

  useEffect(() => {
    const taxAmount = FLORIDA_TAX * subTotal;
    setTax(taxAmount);
    const total = taxAmount + subTotal;
    setTotal(total);
  }, [subTotal]);

  return (
    <section>
      <div className="sub-total d-flex">
        <p>Sub Total: </p>
        <p className="ms-auto">${subTotal && Number(subTotal).toFixed(2)}</p>
      </div>
      <div className="tax d-flex">
        <p>Tax: </p>
        <p className="ms-auto">${tax && Number(tax).toFixed(2)}</p>
      </div>
      <div className="total d-flex">
        <p>Total: </p>
        <p className="ms-auto">${total && Number(total).toFixed(2)}</p>
      </div>

      <div className="checkoutBtn">
        <button className="btn btn-primary w-100">Checkout</button>
      </div>
    </section>
  );
};

export default CheckoutFooter;
