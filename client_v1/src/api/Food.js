import Api from "./Api";

/**
 * Get food data
 *
 * @param {{ search?: string, category?: string}} params,
 * @returns {{}[]} list of foods
 */
const get = async (params, controller) => {
  const foods = await Api.get(`/foods`, {
    params,
    signal: controller.signal,
  });
  return foods ?? [];
};

const getFoodByCategory = async (category, page) => {
  const foods = await Api.get(`/foods?category=${category}&page=${page}`);
  return foods ?? { results: [], page };
};

const getFoodBySearch = async (search, page) => {
  const foods = await Api.get(`/foods/search?page=${page}`, {
    search,
  });
  return foods ?? { results: [], page };
};

const Food = {
  getFoodBySearch,
  getFoodByCategory,
};

Object.freeze(Food);
export default Food;
