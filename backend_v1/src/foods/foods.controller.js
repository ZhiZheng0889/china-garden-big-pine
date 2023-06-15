const service = require("./foods.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const PAGINATION = parseInt(process.env.PAGINATION);

async function getAllFoods(req, res, next) {
  const { category = "" } = req.query;
  const page = parseInt(req.query.page ?? 1);
  const results = category
    ? await service.getByCategory(category, page, PAGINATION)
    : await service.getAll(category, page, PAGINATION);
  console.log({ results, page, pagination: PAGINATION });
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
