import React from 'react';
import Card from '../../components/Card/Card';
import CartList from '../../components/CartList/CartList';
import MapContainer from '../../components/MapContainer/MapContainer';
import { Cart } from '../../utils/Cart';
const Checkout = ({ cart, setCart, className }) => {
  const FLORIDA_TAX = 0.075;
  return (
    <main className={`bg-slate-100 min-h-screen pt-6 ${className}`}>
      <section className="mx-auto max-w-2xl bg-white bg-slate-100">
        <h1 className="text-5xl font-semibold mb-4">Checkout</h1>
        <Card classes="mb-4">
          <h3 className="text-lg font-semibold">1. Confirm Order</h3>
          <div className="pl-3">
            <CartList cart={cart} />
          </div>
        </Card>
        <Card classes="mb-4 flex flex-col items-center">
          <div className="flex w-full">
            <h3 className="text-lg font-semibold text-left">2. Review order</h3>
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
        >
          Place Order
        </button>
      </section>
    </main>
  );
};

Checkout.defaultProps = {
  className: '',
};

export default Checkout;
