import React, { useState, useEffect } from "react";
import { formatCost } from "../../../../../../client/src/utils/formatCost";

const FoodModalFooter = ({
  total,
  quantity,
  setQuantity,
  handleAddToCart,
  isLoading,
}) => {
  const [input, setInput] = useState("");

  const updateQuantity = (event) => {
    event.preventDefault();
    const { id } = event.target;
    if (id === "+" && quantity < 999) {
      setQuantity((prev) => prev + 1);
    }
    if (id === "-" && quantity > 0) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleInputChange = (event) => {
    const { value } = event.target;
    if (!value) {
      setInput(0);
      setQuantity(0);
    } else if (value >= 0 && value <= 999) {
      setInput(value);
      setQuantity(parseInt(value));
    }
  };

  useEffect(() => {
    setInput(quantity);
  }, [quantity]);

  return (
    <div className="p-3 border-t flex items-center">
      <form className="flex items-center gap-3">
        <button
          onClick={updateQuantity}
          id="-"
          className={`w-8 h-8 border rounded-full flex justify-center items-center duration-200 ease-out hover:bg-gray-100 active:bg-gray-200 disabled:bg-neutral-100 disabled:cursor-not-allowed focus:outline outline-2 outline-offset-2 outline-red-600`}
          disabled={quantity === 0}
        >
          <i id="-" className="fa-solid fa-minus"></i>
        </button>
        <input
          value={input}
          type="text"
          onChange={handleInputChange}
          className="border p-3.5 w-16 rounded-md text-center focus:outline outline-2 outline-offset-2 outline-red-600"
        />
        <button
          onClick={updateQuantity}
          id="+"
          className={`w-8 h-8 border rounded-full flex justify-center items-center duration-200 ease-out hover:bg-gray-100 disabled:bg-neutral-100 active:bg-gray-200 disabled:cursor-not-allowed focus:outline outline-2 outline-offset-2 outline-red-600`}
          disabled={quantity === 999}
        >
          <i id="+" className="fa-solid fa-plus"></i>
        </button>
      </form>
      <button
        className="ml-auto p-3 rounded bg-red-600 hover:bg-red-700 active:bg-red-800 text-white disabled:bg-red-500 disabled:cursor-not-allowed  focus:outline outline-2 outline-offset-2 outline-red-600"
        disabled={quantity === 999 || quantity === 0 || isLoading}
        onClick={handleAddToCart}
      >
        {isLoading ? "Loading..." : `Add to Cart - ${formatCost(total)}`}
      </button>
    </div>
  );
};

export default FoodModalFooter;
