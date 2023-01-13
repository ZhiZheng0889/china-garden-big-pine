import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Cart } from '../../../utils/Cart';
import { formatCost } from '../../../utils/formatCost';
import styles from './CheckoutFooter.module.css';
const CheckoutFooter = ({ cart }) => {
  console.log(cart);
  const FLORIDA_TAX = 0.075;
  const [subTotal, setSubTotal] = useState(0);
  const [tax, setTax] = useState(FLORIDA_TAX);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    const cartTotal = Cart.getTotal(cart);
    console.log(cartTotal);
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
        <p className={styles.number}>${subTotal && formatCost(subTotal)}</p>
      </div>
      <div className={`tax ${styles.flex}`}>
        <p>Tax: </p>
        <p className={styles.number}>${tax && formatCost(tax)}</p>
      </div>
      <div className={`total ${styles.flex}`}>
        <p>Total: </p>
        <p className={styles.number}>${total && formatCost(total)}</p>
      </div>
      <div className="mt-3">
        <Link
          to="/checkout"
          className={`block text-center p-2 bg-red-600 hover:bg-red-700 text-white rounded mt-3`}
        >
          Checkout
        </Link>
      </div>
    </section>
  );
};

export default CheckoutFooter;
