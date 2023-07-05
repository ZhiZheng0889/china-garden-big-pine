import React, { useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import { updateCart } from "../../../slices/cartSlice";
import LoadingSpinner from "../../Loading/LoadingSpinner/LoadingSpinner";
import Cart from "../../../api/Cart";
import ApiErrorHandler from "../../../errors/ApiErrorHandler";
import CheckoutConfirmDeleteModal from "../../Checkout/CheckoutConfirmDeleteModal/CheckoutConfirmDeleteModal";
const ButtonQuantity = ({ item, index, cartId, setError }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);
  const dispatch = useDispatch();

  const closeModal = () => {
    setIsDeleteConfirmationOpen(false);
  };

  // params to be used in the component that it is being called in to show loading request from api
  const deleteCartItem = async (setIsParentLoading, setParentError) => {
    try {
      setParentError(null);
      setIsParentLoading(true);
      const response = await Cart.removeFromCart(index, cartId);
      if (response.data) {
        dispatch(updateCart(response.data));
        setIsDeleteConfirmationOpen(false);
      }
    } catch (error) {
      setParentError(ApiErrorHandler.handleRequestResponse(error));
    } finally {
      setIsParentLoading(false);
    }
  };

  const changeQuantity = async ({ target }) => {
    try {
      setError(null);
      setIsLoading(true);
      const { type } = target.dataset;
      const offset = type === "decrement" ? -1 : 1;
      if (item.quantity + offset <= 0) {
        setIsDeleteConfirmationOpen(true);
      } else {
        if (item.quantity + offset < 999) {
          const response = await Cart.updateQuantity(offset, index, cartId);
          if (response.data) {
            dispatch(updateCart(response.data));
          }
        } else {
          setError({ message: "Quantity cannot be greater than 999" });
        }
      }
    } catch (error) {
      setError(ApiErrorHandler.handleRequestResponse(error));
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="border flex rounded-full py-0 px-0 items-center justify-center">
        <button
          className="flex justify-center items-center w-8 h-8 rounded-full hover:bg-gray-100 active:bg-gray-200 duration-200 ease-out focus:outline outline-2 outline-offset-2 outline-red-600"
          data-type="decrement"
          onClick={changeQuantity}
        >
          <i
            className={`fa-solid fa-${item.quantity === 1 ? "trash" : "minus"}`}
            data-type="decrement"
          ></i>
        </button>
        <div className="w-8 flex justify-center items-center">
          {isLoading ? <LoadingSpinner /> : <p>{item.quantity}</p>}
        </div>

        <button
          className="flex justify-center items-center w-8 h-8 rounded-full hover:bg-gray-100 active:bg-gray-200 duration-200 ease-out focus:outline outline-2 outline-offset-2 outline-red-600"
          data-type="increment"
          onClick={changeQuantity}
        >
          <i className="fa-solid fa-plus" data-type="increment"></i>
        </button>
      </div>
      {createPortal(
        <CheckoutConfirmDeleteModal
          isOpen={isDeleteConfirmationOpen}
          closeModal={closeModal}
          deleteCartItem={deleteCartItem}
        />,
        document.body
      )}
    </>
  );
};

export default ButtonQuantity;
