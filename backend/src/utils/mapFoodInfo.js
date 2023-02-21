const mapFoodInfo = (cart, foodOptions, foodSizes) => {
  return cart.map((item) => {
    const output = item;
    const option = foodOptions.find(
      (option) => option.food_option_id === output.food_option_id
    );
    if (option) {
      delete option.food_id;
      output.currentOption = option;
    }
    const size = foodSizes.find(
      (size) => size.food_size_id === output.food_size_id
    );
    if (size) {
      delete size.food_id;
      output.currentSize = size;
    }
    return output;
  });
};

module.exports = mapFoodInfo;
