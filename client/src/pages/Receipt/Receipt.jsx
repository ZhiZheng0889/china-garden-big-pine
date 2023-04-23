import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { OrderApi } from "../../api/orderApi";
import Card from "../../components/Card/Card";
import CartList from "../../components/CartList/CartList";
import Footer from "../../components/Footer/Footer";
import ErrorAlert from "../../errors/ErrorAlert";
const Receipt = () => {
  const [order, setOrder] = useState({});
  const [error, setError] = useState(null);
  const { order_id = null } = useLocation();
  const navigate = useNavigate();
  if (!order_id) {
    navigate("/");
  }
  useEffect(() => {
    (async () => {
      try {
        setError(null);
        const response = await OrderApi.read(order_id);
        setOrder(response);
      } catch (error) {
        setError(error.message);
      }
    })();
  }, [order_id]);
  return (
    <main className="min-h-screen bg-slate-100 pt-6">
      <section className="mx-auto max-w-2xl bg-white bg-slate-100 flex flex-col gap-4">
        <ErrorAlert error={error} />
        <Card>
          <h3 className="font-semibold">Info</h3>
          <p className="font-semibold text-center text-lg">
            Estimated Completion Time
          </p>
          <p className="text-center text-green-900 font-semibold">
            20-35 minutes
          </p>
        </Card>
        {order.hasOwnProperty("cart") && (
          <Card>
            <h3 className="font-semibold">Cart</h3>
            <CartList cart={order.cart} />
          </Card>
        )}
      </section>
    </main>
  );
};

export default Receipt;
