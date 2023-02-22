const mapCart = (orderItems, foods) => {
  console.log('==============================>', orderItems);
  return orderItems.map((item) => {
    return { ...item, ...foods.find((food) => food.food_id === item.food_id) };
  });
};

module.exports = mapCart;
