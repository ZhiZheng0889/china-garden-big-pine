import React from 'react';
import Rating from '../Rating/Rating';
import styles from './FoodCard.module.css';
const FoodCard = ({ food }) => {
  const { food_id, name, price, review, spicy, description = null } = food;

  return (
    <article className={`food-item ${styles.container}`}>
      <div className="details">
        <h5>{name}</h5>
        {description && <p className={styles.description}>{description}</p>}
      </div>
      <div className="ms-auto add">
        <div className="d-flex align-items-center">
          <p className="me-2 mb-0">${price}</p>
          <button className="btn">
            <i class="fa-solid fa-plus"></i>
          </button>
        </div>
      </div>
      <Rating review={review} />
    </article>
  );
};

export default FoodCard;
