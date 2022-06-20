import React from 'react';

const OffCanvasButton = () => {
  return (
    <button
      class="btn btn-light"
      type="button"
      data-bs-toggle="offcanvas"
      data-bs-target="#offcanvasNav"
      aria-controls="offcanvasNav"
    >
      <span>
        <i class="fa-regular fa-bars fa-lg"></i>
      </span>
    </button>
  );
};

export default OffCanvasButton;
