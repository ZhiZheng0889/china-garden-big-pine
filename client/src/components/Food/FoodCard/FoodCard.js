import React, { useState } from 'react';
import styles from './FoodCard.module.css';
import QuantityButton from '../../Button/QuantityButton/QuantityButton';
import ModalTriggerButton from '../../Modal/ModalTriggerButton/ModalTriggerButton';
import Modal from '../../Modal/Modal';
const FoodCard = ({ food, setCart, cart }) => {
  const {
    food_id,
    name,
    price,
    likes = null,
    dislikes = null,
    spicy,
    description = null,
    amount = null,
    options,
  } = food;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen((curr) => !curr);
  };
  return (
    <>
      <article className={`food-item ${styles.container} p-3 border-bottom`}>
        <div className="details">
          <div className="d-flex">
            {spicy && <p>🌶</p>}
            <h5>
              {name}
              {amount && (
                <span className=" ms-2 text-muted text-thin">({amount})</span>
              )}
            </h5>
          </div>

          {description && <p className={styles.description}>{description}</p>}
          <div>
            <p className="me-2 mb-0">
              ${price[0] && Number(price[0]).toFixed(2)}
            </p>
            <p></p>
          </div>
        </div>
        <div className="ms-auto add">
          <div className="d-flex align-items-center">
            <QuantityButton onClick={toggleModal} />
          </div>
        </div>
      </article>
      {isModalOpen && <Modal food={food} />}
    </>
  );
};

export default FoodCard;
