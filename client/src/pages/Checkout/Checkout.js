import React from 'react';
import Card from '../../components/Card/Card';
import CartList from '../../components/CartList/CartList';
const Checkout = ({ cart, setCart }) => {
  return (
    <main className="min-h-screen pt-6">
      <section className="mx-auto max-w-2xl bg-white">
        <h1 className="text-5xl font-semibold mb-4">Checkout</h1>
        <Card classes="mb-4">
          <h3 className="text-lg font-semibold">1. Confirm Order</h3>
          <div className="pl-3">
            <CartList cart={cart} />
          </div>
        </Card>
        <Card classes="mb-4">
          <h3 className="text-lg font-semibold">2. Review order</h3>
        </Card>
        <button className="w-full text-center p-2 bg-red-600 hover:bg-red-700 text-white rounded">
          Place Order
        </button>
      </section>
    </main>
  );
};

export default Checkout;
