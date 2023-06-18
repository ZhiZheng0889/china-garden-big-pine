const Food = require("../db/models/foodModel");
const Pagination = require("../utils/Pagination");

function getAll(page) {
  return Pagination.pageable(Food, {}, page);
}

function getBySearch(text, page) {
  const includeUnderScoreText = text.trim().split(" ").join("_");
  return Pagination.pageable(
    Food,
    {
      $or: [
        { name: { $regex: text, $options: "i" } },
        { category: { $regex: text, $options: "i" } },
        { name: { $regex: includeUnderScoreText, $options: "i" } },
      ],
    },
    page
  );
}

function getByCategory(category, page) {
  console.log("cat: ", category);
  if (category === "all") {
    return Pagination.pageable(Food, {}, page);
  }
  const includeUnderScoreText = category
    .toLowerCase()
    .trim()
    .split(" ")
    .join("_");
  return Pagination.pageable(Food, { category: includeUnderScoreText }, page);
}

module.exports = {
  getAll,
  getBySearch,
  getByCategory,
};
