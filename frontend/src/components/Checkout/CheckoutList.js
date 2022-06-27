import React from 'react';
import CheckoutListCard from './CheckoutListCard';
const CheckoutList = ({ cart, setcart }) => {
  const cartList = cart.map((item, index) => {
    return <CheckoutListCard item={item} key={item.name + index} />;
  });
  if (cartList.length > 0) {
    return <ul>{cartList}</ul>;
  }
  return <p>Nothing in Cart</p>;
};

export default CheckoutList;
