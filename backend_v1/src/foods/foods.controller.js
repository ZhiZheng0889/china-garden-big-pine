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
  const page = parseInt(req.query.page ?? 1);
  const { search = "" } = req.body;
  console.log(page, search);
  const response = await service.getBySearch(search, page);
  console.log("response: ", response);
  if (search && !response.results.length) {
    return next({
      status: 404,
      message: `Search: "${search}" cannot be found`,
    });
  }
  res.status(200).json(response);
}

module.exports = {
  list: [asyncErrorBoundary(getAllFoods)],
  getBySearch: [asyncErrorBoundary(getSearchedFoods)],
};
