import React, { useState } from "react";
import Modal from "../../Modal/Modal";
import ErrorAlert from "../../../errors/ErrorAlert";
import ButtonPrimary from "../../Button/ButtonPrimary/ButtonPrimary";

const CheckoutConfirmDeleteModal = ({ isOpen, closeModal, deleteCartItem }) => {
  const [error, setError] = useState(null);
  return (
    isOpen && (
      <Modal closeModal={closeModal} isOpen={isOpen}>
        <ErrorAlert error={error} />
        <div className="p-3 flex flex-col gap-3">
          <div>
            <h4 className="text-xl font-semibold">
              Are you sure you want to delete this item?
            </h4>
            <p>It cannot be undone.</p>
          </div>

          <div>
            <ButtonPrimary onClick={deleteCartItem}>Delete</ButtonPrimary>
          </div>
        </div>
      </Modal>
    )
  );
};

export default CheckoutConfirmDeleteModal;
