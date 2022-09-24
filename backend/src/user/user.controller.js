const service = require('./foods.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

/*
 * Check queries for specific type of order or list of food.
 *
 */

function checkQueryParams(req, res, next) {
  const { category = '' } = req.query;
  if (category) {
    res.locals.category = category;
  }
  next();
}

/*
 * List foods based on if there is a query parameter or not.
 */
async function list(req, res, next) {
  const { category = '' } = res.locals;
  const data = category
    ? await service.listByCategory(category)
    : await service.list();
  console.log(data);
  res.status(200).json({ data });
}

module.exports = {
  list: [checkQueryParams, asyncErrorBoundary(list)],
};
