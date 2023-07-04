import React from "react";
import OrderListItem from "./OrderListItem/OrderListItem";

const OrderList = ({ order }) => {
  if (!order || !order?.cart.items.length) {
    return <p className="p-3">No cart items...</p>;
  }
  console.log(order);
  return (
    <>
      <ul>
        {Array.isArray(order?.cart?.items) &&
          order.cart.items.map((item, index) => {
            const key = item.food.name + index;
            return (
              <li key={key}>
                <OrderListItem item={item} />
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default OrderList;
