import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './CheckoutFooter.module.css';
const CheckoutFooter = ({ cart }) => {
  const FLORIDA_TAX = 0.075;
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
    <section className={styles.section}>
      <div className={`${styles.subTotal} sub-total`}>
        <p>Sub Total: </p>
        <p className={styles.number}>
          ${subTotal && Number(subTotal).toFixed(2)}
        </p>
      </div>
      <div className={`tax ${styles.flex}`}>
        <p>Tax: </p>
        <p className={styles.number}>${tax && Number(tax).toFixed(2)}</p>
      </div>
      <div className={`total ${styles.flex}`}>
        <p>Total: </p>
        <p className={styles.number}>${total && Number(total).toFixed(2)}</p>
      </div>

      <div className={`checkoutBtn }`}>
        <Link
          to="/checkout"
          className={`btn btn-primary w-100 ${styles.checkoutBtn}`}
        >
          Checkout
        </Link>
      </div>
    </section>
  );
};

export default CheckoutFooter;
