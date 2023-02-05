import React from 'react';

const ProfileOrders = ({ orders }) => {
  return (
    (Array.isArray(orders) && orders.length > 0 && (
      <ul>
        {orders.map((order) => {
          return <li key={order.order_id}></li>;
        })}
      </ul>
    )) || <p>You have no orders...</p>
  );
};

export default ProfileOrders;
