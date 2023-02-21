const mapCart = (orderItems, foods) => {
  console.log('==============================>');
  return orderItems.map((item) => {
    return { ...item, ...foods[item.order_id] };
  });
};

module.exports = mapCart;
