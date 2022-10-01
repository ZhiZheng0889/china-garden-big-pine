import React, { useState } from 'react';
import styles from './Modal.module.css';
const Modal = ({ food, setCart, cart }) => {
  console.log(food);
  const [quantity, setQuantity] = useState(1);
  const [specialRequest, setSpecialRequest] = useState('');
  if (!food) return null;
  const {
    name = '',
    price = '',
    description = '',
    options = '',
    amount = 0,
  } = food;

  const handleAddToCart = (event) => {
    setCart((curr) => [
      ...curr,
      {
        name,
        price,
        description,
        quantity,
      },
    ]);
  };
  return (
    <div
      id="foodModal"
      tabindex="-1"
      aria-labelledby="foodModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="foodModalLabel">
              Modal title
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">...</div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary">
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
