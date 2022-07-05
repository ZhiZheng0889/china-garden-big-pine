import React from 'react';
import styles from './FoodCard.module.css';
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
  const addFood = () => {
    const indexOfFood = cart.map((food) => food.food_id).indexOf(food_id);
    if (indexOfFood !== -1) {
      const udpatedCart = cart[indexOfFood];
      udpatedCart.quantity += 1;
      setCart((prevCart) => [
        ...prevCart.slice(0, indexOfFood),
        udpatedCart,
        ...prevCart.slice(indexOfFood + 1),
      ]);
    } else {
      setCart((prevCart) => [
        ...prevCart,
        { food_id, name, price: price[0], description, quantity: 1 },
      ]);
    }
  };
  console.log(food);
  return (
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
          <button
            className={`rounded-pill btn-hovering border`}
            onClick={addFood}
          >
            <i className="fa-solid fa-plus me-1"></i> Add
          </button>
        </div>
      </div>
    </article>
  );
};

export default FoodCard;
