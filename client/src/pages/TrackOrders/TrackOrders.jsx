import React, { useState } from "react";
import ErrorAlert from "../../errors/ErrorAlert";
import PhoneInput from "../../components/Form/PhoneInput/PhoneInput";
import Card from "../../components/Card/Card";
import AuthenticationModal from "../../components/Modal/AuthenticationModal/AuthenticationModal";
import { Validator } from "../../utils/Validator";
import { OrderApi } from "../../api/orderApi";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

const TrackOrders = () => {
  const [error, setError] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const submitPhoneNumber = async (event) => {
    try {
      event.preventDefault();
      setIsLoading(true);
      setError(null);
      if (Validator.validatePhoneNumber(phoneNumber)) {
        const foundOrders = await OrderApi.getOrdersByPhone(phoneNumber);
        setOrders(foundOrders);
      } else {
        throw new Error("Phone number is not valid");
      }
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 pt-6">
      <section className="mx-auto max-w-2xl bg-white bg-slate-100 flex flex-col gap-4">
        <ErrorAlert error={error} />
        <Card padding="p-0">
          <header className="border-b p-3">
            <h3 className="font-semibold">Orders</h3>
          </header>
          <form className="p-3">
            <div className="flex flex-col gap-2">
              <label htmlFor="phoneNumber" className="capitalize">
                Enter your phone number for orders
              </label>
              <PhoneInput
                state={phoneNumber}
                setState={setPhoneNumber}
                id="phoneNumber"
                placeholder="Phone Number"
              />
              <div>
                <button
                  className="w-24 p-3 duration-200 rounded bg-red-600 text-white hover:bg-red-700 active:bg-red-800  focus:outline outline-2 outline-offset-2 outline-red-600"
                  type="submit"
                  onClick={submitPhoneNumber}
                >
                  {isLoading ? "Loading..." : "Submit"}
                </button>
              </div>
            </div>
          </form>
          <ul>
            {orders.map((order) => {
              const day = dayjs(order.createdAt);
              return (
                <li key={order._id} className="py-3 border-b last:border-none">
                  <div className="flex justify-between mx-3">
                    <p className="font-semibold">{`${day.format(
                      "dddd"
                    )}, ${day.format("D MMM")}`}</p>
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
        </Card>
      </section>
    </main>
  );
};

export default TrackOrders;
