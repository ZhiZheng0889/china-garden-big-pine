import React, { useState } from 'react';
const ChangeQuantityButton = ({
  quantity,
  updateQuantity,
  handleDelete,
  classes,
}) => {
  const handleClick = ({ target }) => {
    const { type } = target.dataset;
    if (type === 'decrement') {
      if (quantity === 1) {
        handleDelete();
      } else {
        updateQuantity(-1);
      }
    } else {
      updateQuantity(1);
    }
  };

  return (
    <div
      className={`${classes} flex border rounded-full py-0 px-0 items-center justify-center`}
    >
      <button
        className="hover:bg-slate-100 active:bg-slate-100 rounded-full w-8 h-8"
        data-type="decrement"
        onClick={handleClick}
      >
        <i
          className={`fa-solid fa-${quantity === 1 ? 'trash' : 'minus'} me-1`}
          data-type="decrement"
        ></i>
      </button>
      <p className="px-3">{quantity + 'x'}</p>
      <button
        className="hover:bg-slate-100 active:bg-slate-100 rounded-full w-8 h-8"
        data-type="increment"
        onClick={handleClick}
      >
        <i className="fa-solid fa-plus me-1" data-type="decrement"></i>
      </button>
    </div>
  );
};

ChangeQuantityButton.defaultProps = {
  classes: '',
};

export default ChangeQuantityButton;
