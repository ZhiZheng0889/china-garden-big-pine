import Api from "./Api";

const create = async (order) => {
  return await Api.post("order", order);
};

const Order = {
  create,
};

Object.freeze(Order);
export default Order;
