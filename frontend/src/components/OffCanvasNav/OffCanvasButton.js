import React from 'react';

const OffCanvasButton = () => {
  return (
    <button
      className="btn btn-light"
      type="button"
      data-bs-toggle="offcanvas"
      data-bs-target="#offcanvasNav"
      aria-controls="offcanvasNav"
    >
      <span>
        <i className="fa-regular fa-bars fa-lg"></i>
      </span>
    </button>
  );
};

export default OffCanvasButton;
