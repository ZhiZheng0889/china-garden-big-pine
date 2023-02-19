import React from 'react';
import { Cart } from '../../utils/Cart';
import { isObjectEmpty } from '../../utils/isObjectEmpty';
const CartList = ({ cart }) => {
  return (
    cart &&
    cart.length > 0 && (
      <ul className="list-disc pl-3">
        {cart.map((item, index) => {
          return (
            <li key={item.name + index}>
              <h4 className="font-semibold">{item.name}</h4>
              <ul className="pl-3">
                {!isObjectEmpty(item.currentOption) && (
                  <li>item.option.option</li>
                )}
                {!isObjectEmpty(item.currentSize) && (
                  <li>{item.currentSize.option}</li>
                )}
              </ul>
              <p className="font-medium">${Cart.getItemTotal(index, cart)}</p>
            </li>
          );
        })}
      </ul>
    )
  );
};

export default CartList;
