import React from "react";
import ButtonClear from "../../Button/ButtonClear/ButtonClear";

const ModalHeader = ({ closeModal, header }) => {
  return (
    <div className="p-3 border-b flex justify-end">
      <ButtonClear onClick={closeModal}>Close</ButtonClear>
    </div>
  );
};

export default ModalHeader;
