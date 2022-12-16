const service = require('./foods.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');
const reduceProperties = require('../utils/reduceProperties');
/*
 * Check queries for specific type of order or list of food.
 *
 */

const asynclist = async (req, res) => {
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          options: 'i',
        },
      }
    : {};

  const food = await foods.find({ ...keyword });

  res.json(food);
};

function checkQueryParams(req, res, next) {
  /*
   * update so that if there is a search query in the url to save the search to res.locals.search
   */
  const { category = '' } = req.query;
  if (category) {
    res.locals.category = category;
  }
  const { search = '' } = req.query;
  if (search) {
    res.locals.search = search;
  }
  next();
}

const foodConfig = {
  size: 'sizes',
  amount: 'amounts',
  option: 'options',
};

/*
 * List foods based on if there is a query parameter or not.
 */
async function list(req, res, next) {
  /*
   * If res.locals.search is defined use service.search() function
   */
  const { category = '', search = '' } = res.locals;
  let data;
  if (search) {
    data = await service.search(search);
    console.log(data);
  } else if (category) {
    data = await service.listByCategory(category);
  } else {
    data = await service.list();
  }
  const sizes = await service.listSizes();
  const options = await service.listOptions();
  const amounts = await service.listAmounts();
  data = reduceProperties('food_id', {});
  res.status(200).json({ data: { data, sizes, options, amounts } });
}

module.exports = {
  list: [checkQueryParams, asyncErrorBoundary(list)],
};
