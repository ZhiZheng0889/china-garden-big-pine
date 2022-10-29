import React, { useContext, useEffect, useState } from 'react';
import ModalFooter from './ModalFooter/ModalFooter';
import ErrorAlert from '../../errors/ErrorAlert';
import SpecialRequest from './SpecialRequest/SpecialRequest';
import ModalOptions from './ModalOptions/ModalOptions';
import styles from './Modal.module.css';
import { Cart } from '../../utils/Cart';
const Modal = ({ food, setCart, cart, setFood }) => {
  const [quantity, setQuantity] = useState(1);
  const [specialRequest, setSpecialRequest] = useState('');
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(null);
  const {
    name = '',
    price = '',
    description = '',
    options = '',
    amount = 0,
    size,
  } = food;

  useEffect(() => {
    setTotal(quantity * price);
  }, [quantity, price]);

  if (!food) return null;

  const handleAddToCart = (event) => {
    if (quantity <= 0) {
      setError({ message: 'Quantity has to be greater than zero' });
    } else {
      const item = {
        name,
        description,
        quantity,
        specialRequest,
        price,
      };
      Cart.add(item, cart, setCart);
      setFood(null);
    }
  };
  return (
    <>
      <div className={`${styles.modalBackdrop}`}></div>
      <article
        className={styles.modal}
        id="foodModal"
        tabIndex="-1"
        aria-labelledby="foodModalLabel"
        aria-hidden={food ? true : false}
      >
        <header className={styles.header}>
          <button
            type="button"
            className={styles.button}
            data-bs-dismiss="modal"
            aria-label="Close"
            onClick={() => setFood(null)}
          >
            <i className="fa-regular fa-xmark fa-2x"></i>
          </button>
        </header>
        <section className={styles.main}>
          {<ErrorAlert error={error} />}
          <h2 className={styles.title}>{name}</h2>
          <p>{description}</p>
          {size && (
            <ModalOptions
              title={'Size Options'}
              description={'Choose 1'}
              options={size}
            />
          )}
          {options && <ModalOptions title={'Options'} options={options} />}
          <SpecialRequest
            specialRequest={specialRequest}
            setSpecialRequest={setSpecialRequest}
          />
        </section>
        <ModalFooter
          total={total}
          setQuantity={setQuantity}
          quantity={quantity}
          handleAddToCart={handleAddToCart}
        />
      </article>
    </>
  );
};

export default Modal;
