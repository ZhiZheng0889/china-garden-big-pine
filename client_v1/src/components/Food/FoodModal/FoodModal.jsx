import React, { useState } from "react";
import Modal from "../../Modal/Modal";
import { useDispatch } from "react-redux";
import { unselectFood } from "../../../slices/selectedFoodSlice";
const FoodModal = ({ selectedFood }) => {
  const [error, setError] = useState(null);
  const [specialRequest, setSpecialRequest] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedOption, setSelectedOption] = useState(
    selectedFood?.options ? 0 : null
  );
  const [selectedSize, setSelectedSize] = useState(
    selectedFood?.sizes ? 0 : null
  );
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(unselectFood());
  };
  console.log("OPENED", selectedFood);
  return <Modal closeModal={closeModal}></Modal>;
};

export default FoodModal;
