import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Cart } from "../../../utils/Cart";
import { formatCost } from "../../../utils/formatCost";
import styles from "./CheckoutFooter.module.css";
const CheckoutFooter = ({ cart, hideButton, setIsCheckoutOpen }) => {
  const FLORIDA_TAX = 0.075;
  const [subTotal, setSubTotal] = useState(0);
  const [tax, setTax] = useState(FLORIDA_TAX);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    const cartTotal = Cart.getCartTotal(cart);
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
        <p className={`${styles.number} font-semibold`}>
          ${total && formatCost(total)}
        </p>
      </div>
      {!hideButton && (
        <div className="py-3">
          <Link
            to="/checkout"
            className={`block text-center p-2 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white rounded mt-3  focus:outline outline-2 outline-offset-2 outline-red-600`}
            onClick={() => setIsCheckoutOpen(false)}
          >
            Checkout
          </Link>
        </div>
      )}
    </section>
  );
};

CheckoutFooter.defaultProps = {
  hideButton: false,
};

export default CheckoutFooter;
