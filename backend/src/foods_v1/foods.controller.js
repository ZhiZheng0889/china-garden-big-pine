const service = require("./foods.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

function getParams(req, res, next) {
  const { category = "", search = "", page = "" } = req.query;
  if (category) {
    res.locals.category = category;
  }
  if (search) {
    res.locals.search = search;
  }
  res.locals.page = page ?? 1;
  return next();
}

async function listFoods(req, res, next) {
  const { category, search, page } = req.query;
}

module.exports = {
  list: [getParams, asyncErrorBoundary(listFoods)],
};
