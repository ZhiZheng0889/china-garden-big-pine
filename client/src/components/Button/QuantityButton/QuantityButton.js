import React, { useState } from 'react';

const QuantityButton = ({ cart, setCart, food }) => {
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

  const updateQuantity = () => {
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
  return (
    <>
      <button
        className={`rounded-pill btn-hovering border`}
        data-bs-toggle="modal"
        data-bs-target="#foodModal"
      >
        <i className="fa-solid fa-plus me-1"></i> Add
      </button>
    </>
  );
};

export default QuantityButton;
