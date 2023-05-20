import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { OrderApi } from "../../../api/orderApi";
import ErrorAlert from "../../../errors/ErrorAlert";
import dayjs from "dayjs";
import { toggleOrderLike } from "../../../api/favoriteApi";
const ProfileOrders = ({ user }) => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const { _id: user_id = null } = user;
  console.log(user.user);
  console.log(user_id);
  useEffect(() => {
    setError(null);
    const abortController = new AbortController();
    (async () => {
      try {
        if (user_id) {
          const response = await OrderApi.listUserOrders(
            user_id,
            abortController
          );
          setOrders(response);
        }
      } catch (error) {
        setError(error);
      }
    })();
    return () => {
      abortController.abort();
    };
  }, [user_id]);

  let likeController = null;
  const toggleLike = async ({ target }) => {
    setError(null);
    const orderIndex = target.getAttribute("data-index");
    if (likeController) {
      likeController.abort();
    }
    likeController = new AbortController();
    try {
      const response = await toggleOrderLike(target.id, likeController);
      setOrders((curr) => {
        let tempCurr = [...curr];
        tempCurr[orderIndex] = response;
        return tempCurr;
      });
    } catch (error) {
      setError(error);
    } finally {
      likeController = null;
    }
  };
  return (
    <>
      {error && (
        <div className="p-3">
          <ErrorAlert error={error} setError={setError} />
        </div>
      )}

      {Array.isArray(orders) && orders.length > 0 ? (
        <ul>
          {orders.map((order, index) => {
            const day = dayjs(order.created_at);
            return (
              <li key={order._id} className="py-3 border-b last:border-none">
                <div className="flex justify-between mx-3">
                  <p className="font-semibold">{`${day.format(
                    "dddd"
                  )}, ${day.format("D MMM")}`}</p>
                  {/* <button
                    className="w-10 h-10 rounded-full hover:bg-slate-100 active:bg-slate-200 duration-200 ease-out"
                    id={order._id}
                    data-index={index}
                    onClick={toggleLike}
                  >
                    <i
                      className={`${
                        order.isLiked ? "fa-solid text-red-600" : "fa-regular"
                      } fa-star fa-lg`}
                      id={order._id}
                      data-index={index}
                    ></i>
                  </button> */}
                </div>

                <div className="flex mt-3 px-3">
                  <p className={"text-green-600"}>Submitted</p>
                  <Link
                    to={`${order._id}`}
                    className="px-2 py-1 ml-auto hover:bg-slate-100 hover:underline underline-offset-2 rounded duration-200 ease-out"
                  >
                    Show More{" "}
                    <i className="fa-sharp fa-solid fa-arrow-right"></i>
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="p-4">You have no orders...</p>
      )}
    </>
  );
};

export default ProfileOrders;
