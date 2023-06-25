import React from "react";
import ModalHeader from "./ModalHeader/ModalHeader";

const Modal = ({
  isOpen,
  setIsOpen,
  header,
  children,
  closeModal = () => {
    setIsOpen(false);
  },
}) => {
  return (
    isOpen && (
      <>
        <div className="modal-backdrop" onClick={closeModal}></div>
        <div className="modal w-11/12 md:max-w-2xl max-h-[95%] overflow-y-scroll bg-white z-100 bg-white">
          <ModalHeader setIsOpen={setIsOpen} />
        </div>
      </>
    )
  );
};

export default Modal;
