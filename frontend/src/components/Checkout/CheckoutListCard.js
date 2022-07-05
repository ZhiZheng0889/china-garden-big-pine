import React from 'react';

const CheckoutListCard = ({ item, setCart }) => {
  const { name, price, description, cart } = item;
  const removeItem = () => {};
  return (
    <article className="mb-4">
      <header className="d-flex">
        <p>{name}</p>
        <p className="ms-auto">${price}</p>
      </header>
      <main>{description}</main>
      <div className="d-flex">
        <button
          className="rounded-pill btn-hovering ms-auto"
          onClick={removeItem}
        >
          Remove
        </button>
      </div>
    </article>
  );
};

export default CheckoutListCard;
