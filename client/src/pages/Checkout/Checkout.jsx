import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/Card/Card";
import AuthenticationModal from "../../components/Modal/AuthenticationModal/AuthenticationModal";
import ErrorAlertFixed from "../../errors/ErrorAlertFixed/ErrorAlertFixed";
import { Cart } from "../../utils/Cart";
import { isObjectEmpty } from "../../utils/isObjectEmpty";
import { OrderApi } from "../../api/orderApi";
import { VerifyApi } from "../../api/verifyApi";
import CheckoutComponent from "../../components/Checkout/Checkout";
import PhoneInput from "../../components/Form/PhoneInput/PhoneInput";
import { Validator } from "../../utils/Validator";
const VITE_MAX_ORDER_TOTAL = import.meta.env.VITE_MAX_ORDER_TOTAL;
const Checkout = ({ cart, setCart, className, user, setUser }) => {
  const [error, setError] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isEditingPhoneNumber, setIsEditingPhoneNumber] = useState(
    user?.isPhoneNumberVerified ? false : true
  );
  const [orderButtonText, setOrderButtonText] = useState("Place Order");
  const [requestId, setRequestId] = useState(null);
  const [countryCode, setCountryCode] = useState("1");
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.phoneNumber) {
      setPhoneNumber(user.phoneNumber);
    }
  }, [user?.phoneNumber]);

  const checkVerification = async () => {
    try {
      setError(null);
      if (!Validator.validatePhoneNumber(phoneNumber)) {
        if (!phoneNumber) {
          throw new Error(`A phone number is required.`);
        }
        throw new Error(`Phone number: ${phoneNumber} is invalid`);
      }
      if (user && !isObjectEmpty(user) && user.isPhoneNumberVerified) {
        await submitOrder();
      } else {
        const response = await VerifyApi.sendVerifyToPhoneNumber(
          phoneNumber,
          countryCode
        );
        if (response.request_id) {
          setRequestId(response.request_id);
        } else {
          throw new Error("Error validating phone number");
        }
      }
    } catch (error) {
      setError(error);
    }
  };

  const editPhoneNumber = (event) => {
    event.preventDefault();
    setIsEditingPhoneNumber(true);
  };

  const cancelEdit = (event) => {
    event.preventDefault();
    setIsEditingPhoneNumber(false);
  };

  const saveChanges = (event) => {
    event.preventDefault();
    setIsEditingPhoneNumber(false);
  };

  const submitOrder = async () => {
    try {
      setOrderButtonText("Loading...");
      setError(null);
      const { _id: user_id = null, email = null } = user;

      if (Cart.getCartTotal(cart) > parseInt(VITE_MAX_ORDER_TOTAL)) {
        throw new Error(
          `Cart total exceeds the allowed max order total: $${VITE_MAX_ORDER_TOTAL}. Please call in the order.`
        );
      }
      if (cart.length === 0) {
        throw new Error("Cart cannot be empty");
      }
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

        return {
          food_id,
          specialRequest,
          quantity,
          food_option_id,
          food_size_id,
        };
      });
      const order = {
        user_id,
        email,
        phoneNumber,
        cart: mappedCart,
      };
      const response = await OrderApi.create(order);

      if (response._id) {
        setCart([]);
        return navigate(`/receipt/${response._id}`);
      }
    } catch (error) {
      setError(error);
    } finally {
      setOrderButtonText("Place Order");
    }
  };
  return (
    <>
      <main className={`bg-slate-100 min-h-screen py-6 ${className}`}>
        <section className="mx-auto max-w-2xl bg-slate-100">
          <ErrorAlertFixed error={error} setError={setError} showClose />

          <Card classes="mb-4" isNotRoundedMobile>
            <h1 className="text-2xl font-semibold mb-4">Checkout</h1>
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
          <Card classes="mb-4 flex flex-col gap-3 items-center">
            <div className="flex flex-col w-full">
              <h3 className="text-lg font-semibold text-left">
                3. Confirm Order's Phone Number
              </h3>
              <p>
                We will send you an <b>One Time Password</b> to this mobile
                number
              </p>
            </div>
            <div className="w-full flex gap-2 items-end">
              <div className="flex flex-col flex-1">
                <label htmlFor="phoneNumber" className="capitalize mb-2">
                  Phone Number
                </label>
                {isEditingPhoneNumber ? (
                  <div className="flex flex-col gap-3">
                    <PhoneInput
                      state={phoneNumber}
                      setState={setPhoneNumber}
                      id="phoneNumber"
                    />
                    <div className="flex gap-3 items-center">
                      <button
                        className="px-3 py-2 rounded w-24 hover:bg-neutral-100 active:bg-neutral-200 duration-200 ease-out"
                        onClick={cancelEdit}
                      >
                        Cancel
                      </button>
                      <button
                        className="px-3 py-2 rounded bg-red-600 text-white w-24 hover:bg-red-700 active:bg-red-800 duration-200 ease-out disabled:cursor-not-allowed disabled:bg-red-400"
                        onClick={saveChanges}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex gap-3 items-center">
                      <p className="flex-1 border-b p-2">{phoneNumber}</p>
                      <button
                        className="border rounded w-10 h-10 flex items-center justify-center duration-200 ease-out hover:bg-neutral-100 active:bg-neutral-200"
                        data-field="firstName"
                        onClick={editPhoneNumber}
                      >
                        <i className="fa-solid fa-pen-to-square"></i>
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </Card>
          <div className="px-2 sm:p-0">
            <button
              className="w-full rounded text-center p-3 md:p-2 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white sm:rounded focus:outline outline-2 outline-offset-2 outline-red-600 disabled:bg-red-800 disabled:cursor-not-allowed"
              disabled={cart.length === 0 || orderButtonText === "Loading..."}
              onClick={checkVerification}
            >
              {orderButtonText}
            </button>
          </div>
        </section>
      </main>
      {requestId && (
        <AuthenticationModal
          requestId={requestId}
          setRequestId={setRequestId}
          phoneNumber={phoneNumber}
          submitOrder={submitOrder}
          countryCode={countryCode}
          setCountryCode={setCountryCode}
          user={user}
          setUser={setUser}
        />
      )}
    </>
  );
};

Checkout.defaultProps = {
  className: "",
};

export default Checkout;
