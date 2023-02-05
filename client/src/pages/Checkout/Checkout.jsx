import React from 'react';
import Card from '../../components/Card/Card';
import CartList from '../../components/CartList/CartList';
import MapContainer from '../../components/MapContainer/MapContainer';
const Checkout = ({ cart, setCart, className }) => {
  return (
    <main className={`min-h-screen pt-6 ${className}`}>
      <section className="mx-auto max-w-2xl bg-white">
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
        <button className="w-full text-center p-2 bg-red-600 hover:bg-red-700 text-white rounded">
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
