import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/Card/Card";
import AuthenticationModal from "../../components/Modal/AuthenticationModal/AuthenticationModal";
import ErrorAlert from "../../errors/ErrorAlert";
import { Cart } from "../../utils/Cart";
import { isObjectEmpty } from "../../utils/isObjectEmpty";
import { OrderApi } from "../../api/orderApi";
import { VerifyApi } from "../../api/verifyApi";
import CheckoutComponent from "../../components/Checkout/Checkout";
const Checkout = ({ cart, setCart, className, user, setUser }) => {
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const FLORIDA_TAX = 0.075;
  const [requestId, setRequestId] = useState(null);
  const navigate = useNavigate();
  console.log(cart);
  const checkVerification = async () => {
    if (user && !isObjectEmpty(user) && user.phone_number_is_verified) {
      submitOrder();
    } else if (
      user &&
      !isObjectEmpty(user) &&
      user.user_id &&
      !user.phone_number_is_verified
    ) {
      try {
        setError(null);
        const response = await VerifyApi.sendVerifyToPhoneNumber(
          user.phone_number
        );
        if (response.request_id) {
          setRequestId(response.request_id);
          setIsVerifyModalOpen(true);
        } else {
          throw new Error("Error sending request");
        }
      } catch (error) {
        setError(error.message);
      }
    } else {
      setIsVerifyModalOpen(true);
    }
  };

  const submitOrder = async () => {
    try {
      const { _id: user_id = null, email = null } = user;
      const mappedCart = cart.map((item) => {
        const {
          food: { _id: food_id },
          specialRequest,
          quantity,
          currentOption,
          currentSize,
        } = item;
        const food_option_id = currentOption?.food_option_id || null;
        const food_size_id = currentSize?.food_size_id || null;
        console.log(
          food_id,
          specialRequest,
          quantity,
          currentOption,
          currentSize
        );
        return {
          food_id,
          specialRequest,
          quantity,
          food_option_id,
          food_size_id,
        };
      });
      const phoneNumber = "19102006686";
      const order = {
        user_id,
        email,
        phoneNumber,
        cart: mappedCart,
      };
      const response = await OrderApi.create(order);
      console.log(response);
      if (response._id) {
        setCart([]);
        return navigate(`/receipt/${response._id}`);
      }
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };
  return (
    <>
      <main className={`bg-slate-100 min-h-screen pt-6 ${className}`}>
        <section className="mx-auto max-w-2xl bg-white bg-slate-100">
          <ErrorAlert error={error} />
          <h1 className="text-4xl font-semibold mb-4">Checkout</h1>
          <Card classes="mb-4">
            <h3 className="text-lg font-semibold">1. Confirm Order</h3>
            <div className="">
              <CheckoutComponent cart={cart} setCart={setCart} hideButton />
            </div>
          </Card>
          <Card classes="mb-4 flex flex-col items-center">
            <div className="flex w-full">
              <h3 className="text-lg font-semibold text-left">
                2. Review order
              </h3>
            </div>
            {/* <MapContainer /> */}
            <p>Estimated completion time</p>
            <p className="font-semibold text-xl">15-25 Minutes</p>
          </Card>
          <button
            className="w-full text-center p-2 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white rounded"
            disabled={cart.length === 0}
            onClick={submitOrder}
          >
            Place Order
          </button>
        </section>
      </main>
      <AuthenticationModal
        isModalOpen={isVerifyModalOpen}
        setIsModalOpen={setIsVerifyModalOpen}
        user={user}
        setUser={setUser}
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        submitOrder={submitOrder}
        sentRequestId={requestId}
      />
    </>
  );
};

Checkout.defaultProps = {
  className: "",
};

export default Checkout;
