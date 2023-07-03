import React, { useState } from "react";
import Modal from "../../Modal/Modal";
import ErrorAlert from "../../../errors/ErrorAlert";
import ButtonPrimary from "../../Button/ButtonPrimary/ButtonPrimary";
import ButtonLight from "../../Button/ButtonLight/ButtonLight";

const CheckoutConfirmDeleteModal = ({ isOpen, closeModal, deleteCartItem }) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  return (
    isOpen && (
      <Modal closeModal={closeModal} isOpen={isOpen}>
        <ErrorAlert error={error} className="m-3" />
        <div className="p-3 flex flex-col gap-3">
          <div>
            <h4 className="text-xl font-semibold">
              Are you sure you want to delete this item?
            </h4>
            <p>It cannot be undone.</p>
          </div>

          <div className="flex items-center gap-3">
            <ButtonPrimary
              onClick={() => deleteCartItem(setIsLoading, setError)}
              className="w-20"
            >
              {isLoading ? "Loading..." : "Delete"}
            </ButtonPrimary>
            <ButtonLight onClick={closeModal} className="w-20">
              Cancel
            </ButtonLight>
          </div>
        </div>
      </Modal>
    )
  );
};

export default CheckoutConfirmDeleteModal;
