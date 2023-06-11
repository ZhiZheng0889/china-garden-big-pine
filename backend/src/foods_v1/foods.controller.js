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
  if (page) {
    res.locals.page = page;
  }
  return next();
}

async function listFoods(req, res, next) {
  const pagination = parseInt(process.env.PAGINATION);
  const { page, category, search } = res.locals;
  const pageAsNumber = parseInt(page);
  let food;
  console.log("category: ", category);
  if (category && category !== "all") {
    food = await service.listByCategory(category, pageAsNumber, pagination);
  } else if (search) {
    food = await service.search(search, pageAsNumber, pagination);
  } else {
    food = await service.listAll(pageAsNumber, pagination);
  }
  if (category && !food.length) {
    return next({
      status: 404,
      message: `Category: ${category} does not exist`,
    });
  }
  res.status(200).json({ food, page: pageAsNumber, pagination });
}

module.exports = {
  list: [getParams, asyncErrorBoundary(listFoods)],
};
