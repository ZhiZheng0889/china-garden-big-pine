import React, { useEffect, useState } from 'react';
import ModalFooter from './ModalFooter/ModalFooter';
import ErrorAlert from '../../errors/ErrorAlert';
import styles from './Modal.module.css';
const Modal = ({ food, setCart, cart, setFood }) => {
  console.log(food);
  const [quantity, setQuantity] = useState(1);
  const [specialRequest, setSpecialRequest] = useState('');
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(null);
  if (!food) return null;
  const {
    name = '',
    price = '',
    description = '',
    options = '',
    amount = 0,
  } = food;

  useEffect(() => {
    setTotal(quantity * price);
  }, [quantity, price]);

  const handleAddToCart = (event) => {
    if (quantity <= 0) {
      setError({ message: 'Quantity has to be greater than zero' });
    } else {
      setCart((curr) => [
        ...curr,
        {
          name,
          price,
          description,
          quantity,
        },
      ]);
    }
  };
  console.log(food);
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
            <i class="fa-regular fa-xmark fa-2x"></i>
          </button>
        </header>
        <section className={styles.main}>
          {<ErrorAlert error={error} />}
          <h2 className={styles.title}>{name}</h2>
          <p>{description}</p>
        </section>
        <ModalFooter
          total={total}
          setQuantity={setQuantity}
          quantity={quantity}
          handleAddToCart={handleAddToCart}
        />
      </article>
    </>

    // <div
    //   id="foodModal"
    //   tabindex="-1"
    //   aria-labelledby="foodModalLabel"
    //   aria-hidden="true"
    // >
    //   <div class="modal-dialog">
    //     <div class="modal-content">
    //       <div class="modal-header">
    //         <h5 class="modal-title" id="foodModalLabel">
    //           Modal title
    //         </h5>
    //         <button
    //           type="button"
    //           class="btn-close"
    //           data-bs-dismiss="modal"
    //           aria-label="Close"
    //         ></button>
    //       </div>
    //       <div class="modal-body">...</div>
    //       <div class="modal-footer">
    //         <button
    //           type="button"
    //           class="btn btn-secondary"
    //           data-bs-dismiss="modal"
    //         >
    //           Close
    //         </button>
    //         <button type="button" class="btn btn-primary">
    //           Save changes
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Modal;
