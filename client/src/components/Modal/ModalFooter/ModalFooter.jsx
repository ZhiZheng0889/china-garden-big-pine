import React, { useEffect, useState } from "react";
import styles from "./ModalFooter.module.css";
const ModalFooter = ({ total, setQuantity, quantity, handleAddToCart }) => {
  const [input, setInput] = useState("");
  const updateQuantity = (event) => {
    event.preventDefault();
    const { id } = event.target;
    if (id === "+" && quantity < 999) {
      setQuantity((prev) => prev + 1);
    }
    if (id === "-" && quantity > 0) {
      setQuantity((prev) => prev - 1);
    }
  };
  const handleInputChange = (event) => {
    const { value } = event.target;
    if (!value) {
      setInput(0);
      setQuantity(0);
    } else if (value >= 0 && value <= 999) {
      setInput(value);
      setQuantity(parseInt(value));
    }
  };

  useEffect(() => {
    setInput(quantity);
  }, [quantity]);
  return (
    <footer className={styles.footer}>
      <form className={styles.form}>
        <button
          onClick={updateQuantity}
          id="-"
          className={`w-8 h-8 flex justify-center items-center  disabled:bg-neutral-100 disabled:cursor-not-allowed ${styles.button} ${styles.decrement}  focus:outline outline-2 outline-offset-2 outline-red-600`}
          disabled={quantity === 0}
        >
          <i id="-" className="fa-solid fa-minus"></i>
        </button>
        <input
          value={input}
          type="text"
          onChange={handleInputChange}
          className={`${styles.input} focus:outline outline-2 outline-offset-2 outline-red-600`}
        />
        <button
          onClick={updateQuantity}
          id="+"
          className={`w-8 h-8 flex justify-center items-center disabled:bg-neutral-100 disabled:cursor-not-allowed ${styles.button} ${styles.increment}  focus:outline outline-2 outline-offset-2 outline-red-600`}
          disabled={quantity === 999}
        >
          <i id="+" className="fa-solid fa-plus"></i>
        </button>
      </form>
      <button
        className="p-3 rounded bg-red-600 hover:bg-red-700 active:bg-red-800 text-white disabled:bg-red-500 disabled:cursor-not-allowed  focus:outline outline-2 outline-offset-2 outline-red-600"
        disabled={quantity === 999 || quantity === 0}
        onClick={handleAddToCart}
      >
        Add to Cart - ${total.toFixed(2)}
      </button>
    </footer>
  );
};

export default ModalFooter;
