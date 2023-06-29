import React, { useState } from "react";
import Modal from "../../Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { unselectFood } from "../../../slices/selectedFoodSlice";
import FoodModalSizes from "./FoodModalSizes/FoodModalSizes";
import FoodModalOptions from "./FoodModalOptions/FoodModalOptions";
import FoodModalFooter from "./FoodModalFooter/FoodModalFooter";
import FoodModalSpecialRequest from "./FoodModalSpecialRequest/FoodModalSpecialRequest";
import ErrorAlertFixed from "../../../errors/ErrorAlertFixed/ErrorAlertFixed";
import Cart from "../../../api/Cart";
import { updateCart } from "../../../slices/cartSlice";

const calculateTotal = (quantity, food, selectedOption, selectedSize) => {
  let optionTotal = 0;
  let sizeTotal = 0;
  if (food) {
    if (selectedOption === 0 || selectedOption) {
      optionTotal = food.options[selectedOption]?.upcharge ?? 0;
    }
    if (selectedSize === 0 || selectedSize) {
      sizeTotal = food.sizes[selectedSize]?.upcharge ?? 0;
    }
  }
  return (food?.basePrice + sizeTotal + optionTotal) * quantity;
};

const FoodModal = ({ selectedFood }) => {
  const [error, setError] = useState(null);
  const [specialRequest, setSpecialRequest] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedOption, setSelectedOption] = useState(
    selectedFood?.options ? 0 : null
  );
  const [selectedSize, setSelectedSize] = useState(
    selectedFood?.sizes.length ? 0 : null
  );
  const [isLoading, setIsLoading] = useState(false);

  const total = calculateTotal(
    quantity,
    selectedFood,
    selectedOption,
    selectedSize
  );

  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(unselectFood());
  };

  const handleAddToCart = async () => {
    try {
      setIsLoading(true);
      const itemToAdd = {
        food_id: selectedFood._id,
        specialRequest,
        selectedOption,
        selectedSize,
        quantity,
      };
      const response = await Cart.addToCart(itemToAdd, cart._id);
      if (response.data) {
        dispatch(updateCart(response.data));
        closeModal();
      }
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    selectedFood && (
      <Modal closeModal={closeModal} isOpen={selectedFood}>
        <ErrorAlertFixed error={error} />
        <div className="p-3 flex flex-col gap-3">
          <div>
            <h3 className="text-2xl font-semibold">{selectedFood.name}</h3>
            {selectedFood.description && (
              <p className="hidden md:block pr-2 text-gray-600 -translate-y-1">
                {selectedFood.description}
              </p>
            )}
          </div>
          {selectedFood.imageUrl && (
            <div className="mt-7">
              <img src={selectedFood.imageUrl} className="max-h-96" />
            </div>
          )}
          <FoodModalOptions
            options={selectedFood.options}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
          <FoodModalSizes
            sizes={selectedFood.sizes}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
          />
          <FoodModalSpecialRequest
            specialRequest={specialRequest}
            setSpecialRequest={setSpecialRequest}
          />
        </div>
        <FoodModalFooter
          total={total}
          quantity={quantity}
          setQuantity={setQuantity}
          handleAddToCart={handleAddToCart}
          isLoading={isLoading}
        />
      </Modal>
    )
  );
};

export default FoodModal;
