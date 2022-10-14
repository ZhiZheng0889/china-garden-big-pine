import React, { useEffect, useState } from 'react';
import styles from './ModalFooter.module.css';
const ModalFooter = ({ total, setQuantity, quantity }) => {
  const [input, setInput] = useState('');
  const updateQuantity = (event) => {
    event.preventDefault();
    const { id } = event.target;
    console.log(id);
    setQuantity((prev) => (id === '+' ? (prev += 1) : (prev -= 1)));
  };
  const handleInputChange = (event) => {
    const { value } = event.target;
    setInput(value);
  };

  useEffect(() => {
    setInput(quantity);
  }, [quantity]);
  return (
    <footer className={styles.footer}>
      <form>
        <button onClick={updateQuantity} id="-">
          -
        </button>
        <input value={input} type="text" onChange={handleInputChange} />
        <button onClick={updateQuantity} id="+">
          +
        </button>
      </form>
      <button className="btn btn-primary">
        Add to Cart - ${total.toFixed(2)}
      </button>
    </footer>
  );
};

export default ModalFooter;
