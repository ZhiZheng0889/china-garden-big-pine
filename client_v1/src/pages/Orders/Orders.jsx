import React, { useState } from "react";
import ContainerSmall from "../../components/Container/ContainerSmall/ContainerSmall";
import ErrorAlert from "../../errors/ErrorAlert";
import Card from "../../components/Card/Card";
import FormInputContainer from "../../components/Form/FormInputContainer/FormInputContainer";
import ButtonPrimary from "../../components/Button/ButtonPrimary/ButtonPrimary";
import ApiErrorHandler from "../../errors/ApiErrorHandler";
import Footer from "../../components/Footer/Footer";
import Order from "../../api/Order";
import dayjs from "dayjs";
import ButtonClear from "../../components/Button/ButtonClear/ButtonClear";
import { formatCost } from "../../utils/formatCost";

const Orders = () => {
  const [error, setError] = useState(null);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  const searchOrders = async (event) => {
    try {
      event.preventDefault();
      setIsLoading(true);
      setError(null);
      setOrders([]);
      const response = await Order.getByPhone(phoneNumber);
      console.log("RES: ", response);
      if (response.data) {
        setOrders(response.data);
      }
    } catch (err) {
      setError(ApiErrorHandler.handleRequestResponse(err));
    } finally {
      setIsLoading(false);
    }
  };

  console.log(orders);

  return (
    <main className="bg-gray-100 grow py-6">
      <ContainerSmall>
        <ErrorAlert error={error} className="mb-3" />
        <div className="flex flex-col gap-5">
          <Card padding="p-0">
            <div className="p-3 border-b">
              <h3 className="text-lg font-semibold">Search You Orders</h3>
            </div>
            <form className="p-3 flex flex-col gap-3">
              <FormInputContainer
                state={phoneNumber}
                setState={setPhoneNumber}
                placeholder="Enter your phone number..."
                usePhoneInput={true}
                name="Phone Number"
              />
              <div>
                <ButtonPrimary
                  width="w-24"
                  type="submit"
                  onClick={searchOrders}
                >
                  {isLoading ? "Loading..." : "Search"}
                </ButtonPrimary>
              </div>
            </form>
            <div>
              <ul>
                {orders.length > 0 ? (
                  orders.map((order) => {
                    const day = dayjs(order.createdAt);
                    return (
                      <li key={order._id}>
                        <div className="p-3 border-t flex flex-col gap-3 relative">
                          <div>
                            <h4 className="font-semibold">
                              {day.format("dddd, MMM DD")}
                            </h4>
                            <p>${formatCost(order.cart.total)}</p>
                          </div>
                          {order.isComplete ? (
                            <p className="text-green-700">Completed</p>
                          ) : (
                            <p className="text-green-700">Submitted</p>
                          )}
                          <ButtonClear
                            className="absolute right-1 bottom-1"
                            link={`/receipt/${order._id}`}
                          >
                            Show More{" "}
                            <i className="fa-solid fa-arrow-right"></i>
                          </ButtonClear>
                        </div>
                      </li>
                    );
                  })
                ) : (
                  <p className="p-3 border-t">
                    {error
                      ? "Error finding food"
                      : "No orders have been found for today."}
                  </p>
                )}
              </ul>
            </div>
          </Card>
          <Footer />
        </div>
      </ContainerSmall>
    </main>
  );
};

export default Orders;
