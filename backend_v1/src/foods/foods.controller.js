const service = require("./foods.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const PAGINATION = parseInt(process.env.PAGINATION);

async function getAllFoods(req, res, next) {
  const { category = "" } = req.query;
  const page = parseInt(req.query.page ?? 1);
  const results = category
    ? await service.getByCategory(category, page)
    : await service.getAll(category, page);
  res.status(200).json(results);
}

async function getSearchedFoods(req, res, next) {
  const { page = 1 } = req.query;
  const { search = "" } = req.body.data;
  const results = await service.getBySearch(search, page);
  if (search && !results.length) {
    return next({
      status: 404,
      message: `Search: "${search}" cannot be found`,
    });
  }
  res.status(200).json(results);
}

module.exports = {
  list: [asyncErrorBoundary(getAllFoods)],
  getBySearch: [asyncErrorBoundary(getSearchedFoods)],
};
