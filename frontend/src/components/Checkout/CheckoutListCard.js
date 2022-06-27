import React from 'react';

const CheckoutListCard = ({ item }) => {
  const { name, price, description } = item;
  return (
    <article>
      <header className="d-flex">
        <p>{name}</p>
        <p className="ms-auto">${price}</p>
      </header>
      <main>{description}</main>
      <button className="btn">Remove</button>
    </article>
  );
};

export default CheckoutListCard;
