const mapFood = (foods, sizes, options) => {
  for (let i = 0; i < foods.length; i++) {
    const { food_id } = foods[i];
    const foundSizes = sizes.filter((size) => size.food_id === food_id);
    if (foundSizes.length) {
      foods[i].size = {};
      foundSizes.forEach((size) => {
        foods[i].size[size.size] = {
          upCharge: size.upcharge,
        };
      });
    }
    const foundOptions = options.filter((option) => option.food_id === food_id);
    if (foundOptions.length) {
      foods[i].option = {};
      foundOptions.forEach((option) => {
        foods[i].option[option.option] = {
          upCharge: option.upcharge,
        };
      });
    }
  }
  return foods;
};

module.exports = mapFood;
