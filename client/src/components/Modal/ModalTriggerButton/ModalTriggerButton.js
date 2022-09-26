import React from 'react';

const ModalTriggerButton = ({ children, classes, handleClick }) => {
  return (
    <button
      type="button"
      className={`btn btn-primary ${classes}`}
      data-bs-toggle="modal"
      data-bs-target="#foodModal"
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

ModalTriggerButton.defaultProps = {
  classes: '',
};

export default ModalTriggerButton;
