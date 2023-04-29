import React, { useState } from "react";
import styles from "./FoodCard.module.css";
import QuantityButton from "../../Button/QuantityButton/QuantityButton";
import Modal from "../../Modal/Modal";
import bbqRibs from "../../../assets/Foods/Barbecue_Spare_Ribs.jpeg";
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
    imageUrl,
  } = food;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen((curr) => !curr);
  };
  return (
    <>
      <article
        className={`food-item ${styles.container} p-3`}
        data-testid="food-card"
      >
        <div className="details">
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
            <img
              src={"https://i.imgur.com/KvkxN9H.jpg"}
              className="w-[14rem]"
              alt={`${name} image`}
            />
          </div>
          <div>
            <p className="me-2 mb-0">
              ${basePrice && Number(basePrice).toFixed(2)}
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
