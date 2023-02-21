import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/Card/Card';
import CartList from '../../components/CartList/CartList';
import MapContainer from '../../components/MapContainer/MapContainer';
import AuthenticationModal from '../../components/Modal/AuthenticationModal/AuthenticationModal';
import ErrorAlert from '../../errors/ErrorAlert';
import { Cart } from '../../utils/Cart';
import { isObjectEmpty } from '../../utils/isObjectEmpty';
import { OrderApi } from '../../api/orderApi';
const Checkout = ({ cart, setCart, className, user, setUser }) => {
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const FLORIDA_TAX = 0.075;
  const navigate = useNavigate();
  const submitOrder = async () => {
    try {
      // if (user && !isObjectEmpty(user) && user.email_is_verified) {
      // } else {
      //   console.log('in here');
      //   setIsVerifyModalOpen(true);
      // }
      const { user_id = null, email = null } = user;
      const mappedCart = cart.map((item) => {
        const {
          food_id,
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
      const phone_number = '19102006686';
      const order = {
        user_id,
        email,
        phone_number,
        cart: mappedCart,
      };
      console.log(cart, order);
      const response = await OrderApi.create(order);
      console.log('res:', response);
      if (response) {
        navigate(`order/${response.order_id}`);
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <>
      <main className={`bg-slate-100 min-h-screen pt-6 ${className}`}>
        <section className="mx-auto max-w-2xl bg-white bg-slate-100">
          <ErrorAlert error={error} />
          <h1 className="text-5xl font-semibold mb-4">Checkout</h1>
          <Card classes="mb-4">
            <h3 className="text-lg font-semibold">1. Confirm Order</h3>
            <div className="pl-3">
              <CartList cart={cart} />
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
            <p className="font-semibold text-xl">25-35 Minutes</p>
          </Card>
          <Card classes="mb-4 flex flex-col items-center">
            <div className="flex w-full">
              <h3 className="text-lg font-semibold text-left">3. Total</h3>
            </div>
            {/* <MapContainer /> */}
            <p>Total</p>
            <p className="font-semibold text-xl">
              {cart.length === 0
                ? 'Your Cart is empty'
                : `$
            ${(
              Cart.getCartTotal(cart) +
              Cart.getCartTotal(cart) * FLORIDA_TAX
            ).toFixed(2)}`}
            </p>
          </Card>
          <button
            className="w-full text-center p-2 bg-red-600 hover:bg-red-700 text-white rounded"
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
      />
    </>
  );
};

Checkout.defaultProps = {
  className: '',
};

export default Checkout;
