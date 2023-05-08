import React, { useContext, useEffect, useState } from "react";
import ModalFooter from "./ModalFooter/ModalFooter";
import ErrorAlert from "../../errors/ErrorAlert";
import SpecialRequest from "./SpecialRequest/SpecialRequest";
import ModalOptions from "./ModalOptions/ModalOptions";
import { Cart } from "../../utils/Cart";
import { isObjectEmpty } from "../../utils/isObjectEmpty";
import ModalSizes from "./ModalSizes/ModalSizes";
const Modal = ({ food, setCart, cart, setFood }) => {
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(0);
  const [specialRequest, setSpecialRequest] = useState("");
  const [selectedOption, setSelectedOption] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const [error, setError] = useState(null);
  const {
    _id,
    name = "",
    basePrice = null,
    description = "",
    options = null,
    sizes = null,
    imageUrl,
  } = food;

  useEffect(() => {
    let optionTotal = 0;
    let sizeTotal = 0;
    if (selectedOption === 0 || selectedOption) {
      optionTotal = options[selectedOption]?.upcharge;
    }
    if (selectedSize === 0 || selectedSize) {
      sizeTotal = sizes[selectedSize]?.upcharge;
    }
    setTotal(quantity * (optionTotal + sizeTotal + basePrice));
  }, [quantity, selectedOption, selectedSize, basePrice]);

  useEffect(() => {
    if (options.length === 0) setSelectedOption(null);
    if (sizes.length === 0) setSelectedSize(null);
  }, [food]);

  if (!food) return null;

  const handleAddToCart = (event) => {
    if (quantity <= 0) {
      setError({ message: "Quantity has to be greater than zero" });
    } else {
      const formattedFood = {
        ...food,
        food_id: food._id,
      };
      const itemToAdd = {
        food: formattedFood,
        selectedFodSize: selectedSize,
        selectedFoodOption: selectedOption,
        specialRequest,
        quantity,
      };
      Cart.add(itemToAdd, cart, setCart);
      setFood(null);
    }
  };
  return (
    <>
      <div className="modalBackdrop" onClick={() => setFood(null)}></div>
      <article
        className="modal w-11/12 md:max-w-2xl max-h-[95%] overflow-y-scroll bg-white border md:rounded"
        id="foodModal"
        tabIndex="-1"
        aria-labelledby="foodModalLabel"
        aria-hidden={food ? true : false}
      >
        <header className="flex items-center p-3 border-b">
          <button
            type="button"
            className="w-10 h-10 hover:bg-slate-100 rounded-full  focus:outline outline-2 outline-offset-2 outline-red-600"
            data-bs-dismiss="modal"
            aria-label="Close"
            onClick={() => setFood(null)}
          >
            <i className="fa-regular fa-xmark fa-lg"></i>
          </button>
        </header>
        <section className="p-3">
          {<ErrorAlert error={error} />}
          <h2 className="text-4xl mb-5">{name}</h2>
          <p>{description}</p>
          <div>
            {imageUrl && (
              <img
                src={imageUrl}
                alt={`${name} image`}
                className="w-full sm:w-1/2"
              />
            )}
          </div>
          {sizes && (
            <ModalSizes
              sizes={sizes}
              setSelectedSize={setSelectedSize}
              selectedSize={selectedSize}
            />
          )}
          {options && (
            <ModalOptions
              title={"Options"}
              options={options}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
              optionType={"options"}
            />
          )}
          <SpecialRequest
            specialRequest={specialRequest}
            setSpecialRequest={setSpecialRequest}
          />
        </section>
        <ModalFooter
          total={total}
          setQuantity={setQuantity}
          quantity={quantity}
          handleAddToCart={handleAddToCart}
        />
      </article>
    </>
  );
};

export default Modal;
