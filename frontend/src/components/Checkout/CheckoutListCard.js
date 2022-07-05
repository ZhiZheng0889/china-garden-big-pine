import React from 'react';

const CheckoutListCard = ({ item, setCart, cart, index }) => {
  const { name, price, description, quantity } = item;
  const removeItem = () => {
    if (quantity > 1) {
      const food = cart[index];
      food.quantity -= 1;
      setCart((curr) => [
        ...curr.slice(0, index),
        food,
        ...curr.slice(index + 1),
      ]);
    } else {
      setCart((curr) => curr.filter((item, i) => i !== index));
    }
  };
  return (
    <article className="mb-4">
      <header className="d-flex">
        <p>
          {name}{' '}
          {quantity > 1 && <span className="text-muted">x{quantity}</span>}
        </p>
        <p className="ms-auto">
          ${price && (Number(price) * quantity).toFixed(2)}
        </p>
      </header>

      <main>{description}</main>
      <div className="d-flex">
        <button
          className="rounded-pill btn-hovering border ms-auto"
          onClick={removeItem}
        >
          Remove
        </button>
      </div>
    </article>
  );
};

export default CheckoutListCard;
