const service = require("./foods.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const mapFood = require("../utils/mapFood");

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
  /*
   * If res.locals.search is defined use service.search() function
   */
  const { category = "", search = "" } = res.locals;
  let data;
  if (search) {
    data = await service.search(search);
  } else if (category) {
    data = await service.listByCategory(category);
  } else {
    data = await service.list();
  }
  res.status(200).json({ data });
}

// change price in food collection
async function update(req, res, next) {
  const { food_id } = req.params;
  const { price } = req.body.data;

  try {
    const updatedFood = await service.update(food_id, { price });
    res.status(200).json({ data: updatedFood });
  } catch (error) {
    next(error);
  }
}

// change price in foodOptions collection
async function updateOption(req, res, next) {
  const { food_id, option_id } = req.params;
  const { price } = req.body.data;

  try {
    const updatedFoodOption = await service.updateOption(food_id, option_id, { price });
    res.status(200).json({ data: updatedFoodOption });
  } catch (error) {
    next(error);
  }
}

// change price in foodSizes collection
async function updateSize(req, res, next) {
  const { food_id, size_id } = req.params;
  const { price } = req.body.data;

  try {
    const updatedFoodSize = await service.updateSize(food_id, size_id, { price });
    res.status(200).json({ data: updatedFoodSize });
  } catch (error) {
    next(error);
  }
}

// change price in foodAmounts collection
async function updateAmount(req, res, next) {
  const { food_id, amount_id } = req.params;
  const { price } = req.body.data;

  try {
    const updatedFoodAmount = await service.updateAmount(food_id, amount_id, { price });
    res.status(200).json({ data: updatedFoodAmount });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  list: [checkQueryParams, asyncErrorBoundary(list)],
  update: [asyncErrorBoundary(update)],
  updateOption: [asyncErrorBoundary(updateOption)],
  updateSize: [asyncErrorBoundary(updateSize)],
  updateAmount: [asyncErrorBoundary(updateAmount)],
};
