const mapCart = (orderItems, foods) => {
  return orderItems.map((item) => {
    return { ...item, ...foods.find((food) => food.food_id === item.food_id) };
  });
};

module.exports = mapCart;
