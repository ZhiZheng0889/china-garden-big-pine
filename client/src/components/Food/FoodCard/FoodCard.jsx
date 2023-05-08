import React, { useState } from "react";
import styles from "./FoodCard.module.css";
import QuantityButton from "../../Button/QuantityButton/QuantityButton";
import Modal from "../../Modal/Modal";

const FoodCard = ({ food, setCart, cart, setCurrentFood }) => {
  const {
    _id,
    name,
    basePrice,
    likes = null,
    dislikes = null,
    spicy,
    description = null,
    amount = null,
    imageUrl = null,
  } = food;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen((curr) => !curr);
  };
  console.log(food, imageUrl);
  return (
    <>
      <article
        className={`food-item ${styles.container} p-0 h-32 overflow-y-hidden`}
        data-testid="food-card"
      >
        <div className="details pl-3 pt-3 pb-3">
          <div className={styles.header}>
            <h5 className={styles.title}>
              {name}
              {amount && (
                <span className=" ms-2 text-muted text-thin">({amount})</span>
              )}
            </h5>
            {spicy && <p>🌶</p>}
          </div>

          {description && <p className={styles.description}>{description}</p>}
          <div>
            <p className="me-2 mb-0">
              ${basePrice && Number(basePrice).toFixed(2)}
            </p>
            <p></p>
          </div>
        </div>
        <div className={styles.quantityContainer}>
          {imageUrl ? (
            <div className="relative">
              <img
                src={imageUrl}
                className="object-cover w-[14rem] object-center"
                alt={`${name} image`}
              />
              <QuantityButton
                onClick={toggleModal}
                cart={cart}
                setCurrentFood={setCurrentFood}
                food={food}
                className="absolute top-3 right-3 drop-shadow-md"
              />
            </div>
          ) : (
            <QuantityButton
              onClick={toggleModal}
              cart={cart}
              setCurrentFood={setCurrentFood}
              food={food}
              className={"drop-shadow-md mt-3 mr-3"}
            />
          )}
        </div>
      </article>
      {isModalOpen && (
        <Modal
          food={food}
          setCart={setCart}
          cart={cart}
          isModalOpen={isModalOpen}
        />
      )}
    </>
  );
};

export default FoodCard;
