import React from "react";
import ModalHeader from "./ModalHeader/ModalHeader";

const Modal = ({ isOpen, closeModal, header, children }) => {
  return (
    isOpen && (
      <>
        <div className="modal-backdrop" onClick={closeModal}></div>
        <div className="modal w-11/12 md:max-w-2xl max-h-[95%] overflow-y-auto bg-white z-100 bg-white">
          <ModalHeader closeModal={closeModal} header={header} />
          {children}
        </div>
      </>
    )
  );
};

export default Modal;
