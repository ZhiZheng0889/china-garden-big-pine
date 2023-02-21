import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { OrderApi } from '../../api/orderApi';
import Card from '../../components/Card/Card';
import Footer from '../../components/Footer/Footer';
import ErrorAlert from '../../errors/ErrorAlert';
const Order = () => {
  const { order_id } = useParams();
  const [order, setOrder] = useState({});
  const [error, setError] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        setError(null);
        const response = await OrderApi.read(order_id);
        console.log(response);
        setOrder(response);
      } catch (error) {
        setError(error.message);
      }
    })();
  }, [order_id]);
  console.log(error);
  return (
    <main className="min-h-screen bg-slate-100 flex justify-center pt-6">
      {error && (
        <div className="mb-3">
          <ErrorAlert error={error} />
        </div>
      )}
      <div className="container grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-6">
        <section className="">
          <div className="flex flex-col gap-6">
            <Card classes="flex justify-between align-center">
              <h3 className="text- font-semibold">Order</h3>
            </Card>
          </div>

          <Footer />
        </section>
        <aside className="">
          <Card>
            <h3 className="font-semibold">Info</h3>
            <p className="font-semibold text-center text-lg">
              Estimated Completion Time
            </p>
            <p className="text-center text-green-900 font-semibold">
              20-35 minutes
            </p>
          </Card>
        </aside>
      </div>
    </main>
  );
};

export default Order;
