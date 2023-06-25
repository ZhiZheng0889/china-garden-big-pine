import React, { useState } from "react";
import Modal from "../../Modal/Modal";

const FoodModal = ({ selectedFood, unselectFood }) => {
  const [error, setError] = useState(null);
  const [specialRequest, setSpecialRequest] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedOption, setSelectedOption] = useState(
    selectedFood?.options ? 0 : null
  );
  const [selectedSize, setSelectedSize] = useState(
    selectedFood?.sizes ? 0 : null
  );

  const closeModal = () => {
    unselectFood(null);
  };

  return <Modal closeModal={closeModal}></Modal>;
};

export default FoodModal;
