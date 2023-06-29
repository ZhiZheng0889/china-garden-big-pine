import React from "react";

const ButtonQuantity = ({ item, index, cartId }) => {
  const changeQuantity = async (event) => {
    const response = await Cart.updateQuantity(-1, index, cartId);
  };
  return (
    <div className="border flex rounded-full py-0 px-0 items-center justify-center">
      <button
        className="flex justify-center items-center w-8 h-8 rounded-full hover:bg-gray-100 active:bg-gray-200 duration-200 ease-out"
        data-type="decrement"
        onClick={changeQuantity}
      >
        <i
          className={`fa-solid fa-${item.quantity === 1 ? "trash" : "minus"}`}
          data-type="decrement"
        ></i>
      </button>
      <p className="w-8 text-center">{item.quantity}</p>
      <button
        className="flex justify-center items-center w-8 h-8 rounded-full hover:bg-gray-100 active:bg-gray-200 duration-200 ease-out"
        data-type="increment"
        onClick={changeQuantity}
      >
        <i className="fa-solid fa-plus" data-type="increment"></i>
      </button>
    </div>
  );
};

export default ButtonQuantity;
