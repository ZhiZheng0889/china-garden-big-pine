const service = require("./foods.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function getAllFoods(req, res, next) {
  const { category = "", page = 1 } = req.query;
  console.log("category: ", category, page);
  const results = await service.getAll(category, parseInt(page));
  if (category && !results.length) {
    return next({
      status: 404,
      message: `Category: ${category} does not exist`,
    });
  }
  res.status(200).json({ results, page });
}

async function getSearchedFoods(req, res, next) {
  const { search = "" } = req.query;
}

module.exports = {
  list: [asyncErrorBoundary(getAllFoods)],
  getBySearch: [asyncErrorBoundary(getSearchedFoods)],
};
