import React from 'react';
import styles from './FoodCard.module.css';
const FoodCard = ({ food }) => {
  const {
    food_id,
    name,
    price,
    likes = null,
    dislikes = null,
    spicy,
    description = null,
  } = food;

  return (
    <article className={`food-item ${styles.container} pt-2 pb-2`}>
      <div className="details">
        <h5>{name}</h5>
        {description && <p className={styles.description}>{description}</p>}
        <div>
          <p className="me-2 mb-0">${price}</p>
          <p></p>
        </div>
      </div>
      <div className="ms-auto add">
        <div className="d-flex align-items-center">
          <button className="btn">
            <i class="fa-solid fa-plus me-1"></i> Add
          </button>
        </div>
      </div>
    </article>
  );
};

export default FoodCard;
