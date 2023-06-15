const service = require("./foods.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function getAllFoods(req, res, next) {
  const { category = "" } = req.query;
  const data = await service.getAll(category);
  if (category && !data.length) {
    return next({
      status: 404,
      message: `Category: ${category} does not exist`,
    });
  }
  res.status(200).json(data);
}

async function getSearchedFoods(req, res, next) {
  const { search = "" } = req.query;
}

module.exports = {
  list: [asyncErrorBoundary(getAllFoods)],
  getBySearch: [asyncErrorBoundary(getSearchedFoods)],
};
