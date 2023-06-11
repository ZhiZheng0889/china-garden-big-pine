import Api from "./Api";

/**
 * Get food data
 *
 * @param {{ search?: string, category?: string}} params,
 * @returns {{}[]} list of foods
 */
const get = async (params, controller) => {
  const foods = await Api.get(`/v1/foods`, {
    params,
    signal: controller.signal,
  });
  return foods ?? [];
};

const Food = {
  get,
};

Object.freeze(Food);
export default Food;
