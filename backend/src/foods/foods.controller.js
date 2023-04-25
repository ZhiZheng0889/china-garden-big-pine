const service = require("./foods.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
function checkQueryParams(req, res, next) {
  /*
   * update so that if there is a search query in the url to save the search to res.locals.search
   */
  const { category = "" } = req.query;
  if (category) {
    res.locals.category = category;
  }
  const { search = "" } = req.query;
  if (search) {
    res.locals.search = search;
  }
  next();
}
/*
 * List foods based on if there is a query parameter or not.
 */
async function list(req, res, next) {
  const { category = "", search = "" } = res.locals;
  let data;
  if (search) {
    data = await service.search(search);
  } else if (category) {
    data = await service.listByCategory(category);
  } else {
    data = await service.list();
  }

  if (category && !data.length) {
    res.status(404).json({ error: `Category: ${category} does not exist` });
  } else {
    res.status(200).json({ data });
  }
}

//change price in food table
async function update(req, res, next) {
  const { food_id } = req.params;
  const { price } = req.body.data;
  const data = await service.update(food_id, price);
  res.status(200).json({ data });
}

//change price in foodOptions table

async function updateOption(req, res, next) {
  const { food_id, option_id } = req.params;
  const { price } = req.body.data;
  const data = await service.updateOption(food_id, option_id, price);
  res.status(200).json({ data });
}

//change price in foodSizes table

async function updateSize(req, res, next) {
  const { food_id, size_id } = req.params;
  const { price } = req.body.data;
  const data = await service.updateSize(food_id, size_id, price);
  res.status(200).json({ data });
}

//change price in foodAmounts table

async function updateAmount(req, res, next) {
  const { food_id, amount_id } = req.params;
  const { price } = req.body.data;
  const data = await service.updateAmount(food_id, amount_id, price);
  res.status(200).json({ data });
}

module.exports = {
  list: [checkQueryParams, asyncErrorBoundary(list)],
  update: [asyncErrorBoundary(update)],
  updateOption: [asyncErrorBoundary(updateOption)],
  updateSize: [asyncErrorBoundary(updateSize)],
  updateAmount: [asyncErrorBoundary(updateAmount)],
};
