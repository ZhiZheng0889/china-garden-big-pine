const service = require("./foods.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const { PAGINATION } = process.env;

async function getAllFoods(req, res, next) {
  const { category = "", page = 1 } = req.query;
  const results = category
    ? await service.getByCategory(
        category,
        parseInt(page),
        parseInt(PAGINATION)
      )
    : await service.getAll(category, parseInt(page), parseInt(PAGINATION));
  console.log("RESULTS: ", results);
  if (category && !results.length) {
    return next({
      status: 404,
      message: `Category: "${category}" does not exist`,
    });
  }
  res.status(200).json({ results, page, pagination: PAGINATION });
}

async function getSearchedFoods(req, res, next) {
  const { search = "", page = 1 } = req.query;
  const results = await service.getBySearch(search, page, PAGINATION);
  if (search && !results.length) {
    return next({
      status: 404,
      message: `Search: "${search}" cannot be found`,
    });
  }
  res.status(200).json({ results, page, pagination: PAGINATION });
}

module.exports = {
  list: [asyncErrorBoundary(getAllFoods)],
  getBySearch: [asyncErrorBoundary(getSearchedFoods)],
};
