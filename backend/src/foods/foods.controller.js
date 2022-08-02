const service = require('./foods.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

function checkQueryParams(req, res, next) {
  const { category = '' } = req.query;
  if (category) {
    res.locals.category = category;
  }
  next();
}

async function list(req, res, next) {
  const { category = '' } = res.locals;
  const data = category
    ? await service.listByCategory(category)
    : await service.list();
  console.log(data);
  res.status(200).json({ data });
}
/*
get list
post create
put update
delete destroy
*/

module.exports = {
  list: [checkQueryParams, asyncErrorBoundary(list)],
};
