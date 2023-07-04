import Api from "./Api";

const getDailyHours = async (date) => {
  return await Api.get(`/hours/${date}`);
};

const Hours = {
  getDailyHours,
};

Object.freeze(Hours);
export default Hours;
