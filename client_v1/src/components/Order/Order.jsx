import React, { useEffect, useState } from "react";
import OrderList from "./OrderList/OrderList";
import OrderFooter from "./OrderFooter/OrderFooter";
import ApiErrorHandler from "../../errors/ApiErrorHandler";
import Card from "../Card/Card";
import OrderApi from "../../api/Order";

const Order = ({ order_id }) => {
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        setError(null);
        setOrder(null);
        if (order_id) {
          const response = await OrderApi.get(order_id);
          if (response.data) {
            setOrder(response.data);
          }
        }
      } catch (error) {
        setError(ApiErrorHandler.handleRequestResponse(error));
      } finally {
        setIsLoading(false);
      }
    })();
  }, [order_id]);
  return (
    <div>
      <Card padding="p-0">
        <div className="p-3 border-b">
          <h3 className="text-xl font-semibold">Your Order</h3>
        </div>
        <OrderList order={order} />
        <OrderFooter order={order} />
      </Card>
    </div>
  );
};

export default Order;
