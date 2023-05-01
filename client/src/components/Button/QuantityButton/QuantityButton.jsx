import React, { useState } from "react";
const QuantityButton = ({ food, setCurrentFood, cart, className }) => {
  const {
    food_id = 0,
    name,
    price,
    likes = null,
    dislikes = null,
    spicy,
    description = null,
    amount = null,
    options,
  } = food;
  return (
    <>
      <button
        className={`py-1 px-3 border rounded-full bg-slate-50 hover:bg-slate-100 focus:outline outline-2 outline-offset-2 outline-red-600 ${className}`}
        data-bs-toggle="modal"
        data-bs-target="#foodModal"
        onClick={() => setCurrentFood(food)}
      >
        <i className="fa-solid fa-plus me-1"></i> Add
      </button>
    </>
  );
};

QuantityButton.defaultProps = {
  className: "",
};
export default QuantityButton;
