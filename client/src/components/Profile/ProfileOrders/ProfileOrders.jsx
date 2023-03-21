import React, { useEffect, useState } from "react";
import { OrderApi } from "../../../api/orderApi";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
const ProfileOrders = ({ user }) => {
  const [orders, setOrders] = useState([]);
  const { user_id = null } = user;
  useEffect(() => {
    const abortController = new AbortController();
    (async () => {
      if (user_id) {
        const response = await OrderApi.listUserOrders(
          user_id,
          abortController
        );
        setOrders(response);
      }
      return () => {
        abortController.abort();
      };
    })();
  }, [user_id]);
  return (
    (Array.isArray(orders) && orders.length > 0 && (
      <ul>
        {orders.map((order) => {
          console.log(order);
          const day = dayjs(order.created_at);
          return (
            <li key={order.order_id} className="py-3 border-b last:border-none">
              <div className="flex justify-between mx-3">
                <p className="font-semibold">{`${day.format(
                  "dddd"
                )}, ${day.format("D MMM")}`}</p>
                <button className="w-10 h-10 rounded-full hover:bg-slate-100">
                  <i class="fa-regular fa-star fa-lg"></i>
                </button>
              </div>

              <div className="flex mt-3 px-3">
                <p
                  className={`${
                    order.is_complete ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {order.is_complete ? "Completed" : "In progress"}
                </p>
                <Link
                  to={`/order/${order.order_id}`}
                  className="px-2 py-1 ml-auto hover:bg-slate-100 rounded"
                >
                  Show More <i className="fa-sharp fa-solid fa-arrow-right"></i>
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    )) || <p>You have no orders...</p>
  );
};

export default ProfileOrders;
