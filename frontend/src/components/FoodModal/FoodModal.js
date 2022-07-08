import React, { useState } from 'react';
import styles from './FoodModal.module.css';
const FoodModal = ({ food }) => {
  const { name, price, description, options, amount } = food;
  const [quantity, setQuantity] = useState(1);
  return (
    <div
      class="modal fade"
      id="foodModal"
      tabindex="-1"
      aria-labelledby="foodModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <h5 class="modal-title" id="foodModalLabel">
              {name}
            </h5>
            {description && <p>description</p>}
            {amount && <p>X{amount}</p>}
          </div>
          <div class="modal-footer d-flex justify-content-center align-items-center">
            <form className="d-flex align-items-center">
              <button className={`${styles.btnRound} border`}>
                <i class="fa-solid fa-minus"></i>
              </button>
              <input
                value={quantity}
                className={`form-control ${styles.input}`}
              />
              <button className={`${styles.btnRound} border`}>
                <i className="fa-solid fa-plus"></i>
              </button>
            </form>
            <button
              type="button"
              class={`btn-main ${styles.btn} ms-auto`}
              data-bs-dismiss="modal"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodModal;
