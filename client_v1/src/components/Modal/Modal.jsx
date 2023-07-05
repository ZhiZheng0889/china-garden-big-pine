import React, { useEffect } from "react";
import ModalHeader from "./ModalHeader/ModalHeader";
import FocusTrap from "focus-trap-react";
import { useDisableBodyScroll } from "../../hooks/useDisableBodyScroll";
const Modal = ({ isOpen, closeModal, header, children }) => {
  useEffect(() => {
    const escFunction = (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };
    document.addEventListener("keydown", escFunction, false);

    return () => {
      return document.removeEventListener("keydown", escFunction, false);
    };
  }, []);
  useDisableBodyScroll(isOpen ? JSON.stringify(isOpen) : null);
  return (
    isOpen && (
      <>
        <div className="modal-backdrop" onClick={closeModal}></div>
        <FocusTrap focusTrapOptions={{ initialFocus: "#modal-close-button" }}>
          <div className="border modal w-full min-[362px]:w-11/12 md:max-w-2xl max-h-[95%] overflow-y-auto bg-white z-100 bg-white">
            <ModalHeader closeModal={closeModal} header={header} />
            {children}
          </div>
        </FocusTrap>
      </>
    )
  );
};

export default Modal;
