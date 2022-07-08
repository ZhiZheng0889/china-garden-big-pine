import React from 'react';
import styles from './FoodCard.module.css';
import QuantityButton from '../QuantityButton/QuantityButton';
import FoodModal from '../FoodModal/FoodModal';
const FoodCard = ({ food, setCart, cart }) => {
  console.log(food);
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
  console.log(food);
  return (
    <>
      <article className={`food-item ${styles.container} pt-2 pb-2`}>
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
            <QuantityButton setCart={setCart} cart={cart} food={food} />
          </div>
        </div>
      </article>
      <FoodModal food={food} />
    </>
  );
};

export default FoodCard;
