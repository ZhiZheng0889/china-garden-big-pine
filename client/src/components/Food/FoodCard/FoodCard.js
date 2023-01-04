import React, { useState } from 'react';
import styles from './FoodCard.module.css';
import QuantityButton from '../../Button/QuantityButton/QuantityButton';
import Modal from '../../Modal/Modal';
const FoodCard = ({ food, setCart, cart, setCurrentFood }) => {
  const {
    food_id,
    name,
    base_price,
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
      <article className={`food-item ${styles.container} p-3`}>
        <div className="details">
          <div className={styles.header}>
            {spicy && <p>🌶</p>}
            <h5 className={styles.title}>
              {name}
              {amount && (
                <span className=" ms-2 text-muted text-thin">({amount})</span>
              )}
            </h5>
          </div>

          {description && <p className={styles.description}>{description}</p>}
          <div>
            <p className="me-2 mb-0">
              ${base_price && Number(base_price).toFixed(2)}
            </p>
            <p></p>
          </div>
        </div>
        <div className={styles.quantityContainer}>
          <QuantityButton
            onClick={toggleModal}
            cart={cart}
            setCurrentFood={setCurrentFood}
            food={food}
          />
        </div>
      </article>
      {isModalOpen && <Modal food={food} setCart={setCart} cart={cart} />}
    </>
  );
};

export default FoodCard;
