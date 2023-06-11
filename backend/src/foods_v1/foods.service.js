const Food = require("../db/models/foodModel");

function listAll(page, pagination) {
  return Food.find()
    .skip((parseInt(page) - 1) * parseInt(pagination))
    .limit(parseInt(pagination));
}

function search(text, page, pagination) {
  const includeUnderScoreText = text.trim().split(" ").join("_");
  return Food.find({
    $or: [
      { name: { $regex: text, $options: "i" } },
      { category: { $regex: text, $options: "i" } },
      { name: { $regex: includeUnderScoreText, $options: "i" } },
    ],
  })
    .skip((parseInt(page) - 1) * parseInt(pagination))
    .limit(parseInt(pagination));
}

function listByCategory(category, page, pagination) {
  const includeUnderScoreText = category
    .toLowerCase()
    .trim()
    .split(" ")
    .join("_");
  return Food.find({ category: includeUnderScoreText })
    .skip((parseInt(page) - 1) * parseInt(pagination))
    .limit(parseInt(pagination));
}

module.exports = {
  listAll,
  search,
  listByCategory,
};
