import Api from "./Api";

const create = async (order) => {
  return await Api.post("order", order);
};

const get = async (order_id) => {
  return await Api.get(`order/${order_id}`);
};

const Order = {
  create,
  get,
};

Object.freeze(Order);
export default Order;
