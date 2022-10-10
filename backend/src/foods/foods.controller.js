const service = require('./foods.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

/*
 * Check queries for specific type of order or list of food.
 *
 */

const getFoods = asynclist (async (req, res) =>{
  const keyword = req.query.keyword ? {
    name: {
      $regex: req.query.keyword,
      options: 'i'
    }
  }: {}
  
  const food = await foods.find({...keyword})

  res.json(food)
}

)

function checkQueryParams(req, res, next) {
  /*
   * update so that if there is a search query in the url to save the search to res.locals.search
   */
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
  /*
   * If res.locals.search is defined use service.search() function
   */
  const { category = '' } = res.locals;
  const data = category
    ? await service.listByCategory(category)
    : await service.list();
  res.status(200).json({ data });
}

module.exports = {
  list: [checkQueryParams, asyncErrorBoundary(list)],
};
