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
  } = food;

  useEffect(() => {
    setTotal(
      quantity *
        (options[selectedOption]?.upcharge ||
          0 + sizes[selectedSize]?.upcharge ||
          0 + basePrice)
    );
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
        className="modal bg-white border md:rounded"
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
