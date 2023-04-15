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
import Map from "../../components/Map/Map";
const Checkout = ({ cart, setCart, className, user, setUser }) => {
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const FLORIDA_TAX = 0.075;
  const [requestId, setRequestId] = useState(null);
  const navigate = useNavigate();

  const verifyPhoneNumber = () => {
    setIsVerifyModalOpen(true);
  };

  const submitOrder = async () => {
    try {
      setIsVerifyModalOpen(false);
      if (!phoneNumber) {
        throw new Error("A phone number is required");
      }
      if (!cart || cart.length === 0) {
        throw new Error("A cart cannot be empty");
      }
      const { user_id = null, email = null } = user;
      const formattedCart = cart.reduce((cartItem) => {
        const {
          food: { _id },
          quantity,
          selectedOption = null,
          selectedSize = null,
          specialRequest = "",
        } = cartItem;
        return { _id, quantity, selectedOption, selectedSize, specialRequest };
      });
      const createdOrder = await OrderApi.create({
        phoneNumber,
        user_id,
        email,
        cart: formattedCart,
      });
      console.log(createdOrder);
    } catch (err) {
      console.log(err);
      setError(err);
    }
  };

  return (
    <>
      <main className={`bg-slate-100 min-h-screen py-6 ${className}`}>
        <section className="mx-auto max-w-2xl bg-white bg-slate-100">
          <ErrorAlert error={error} />
          <h1 className="text-4xl font-semibold mb-4">Checkout</h1>
          <Card classes="mb-4">
            <h3 className="text-lg font-semibold">1. Confirm Order</h3>
            <div className="">
              <CheckoutComponent cart={cart} setCart={setCart} hideButton />
            </div>
          </Card>
          <Card classes="mb-4 flex flex-col gap-3 items-center">
            <div className="flex w-full">
              <h3 className="text-lg font-semibold text-left">
                2. Review order
              </h3>
            </div>
            <Map />
            <div>
              <p className="text-center">Estimated completion time</p>
              <p className="text-center font-semibold text-xl">15-25 Minutes</p>
            </div>
          </Card>
          <button
            className="w-full text-center p-2 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white rounded"
            disabled={cart.length === 0}
            onClick={verifyPhoneNumber}
          >
            Place Order
          </button>
        </section>
      </main>
      <AuthenticationModal
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        isOpen={isVerifyModalOpen}
        setIsOpen={setIsVerifyModalOpen}
        submitOrder={submitOrder}
      />
    </>
  );
};

Checkout.defaultProps = {
  className: "",
};

export default Checkout;
