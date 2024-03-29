const getItemTotal = (item) => {
  let optionTotal = 0;
  let sizeTotal = 0;
  if (item.selectedOption) {
    optionTotal = item.food.options[item.selectedOption].upcharge;
  }
  if (item.selectedSize) {
    sizeTotal = item.food.sizes[item.selectedSize].upcharge;
  }
  return (item.food.basePrice + optionTotal + sizeTotal) * item.quantity;
};

const getCartTotal = (cart) => {
  return Array.isArray(cart)
    ? cart.reduce((accumulator, item) => {
        return accumulator + getItemTotal(item);
      }, 0)
    : 0;
};

const getCartTotalQuantity = (cart) => {
  return Array.isArray(cart?.items)
    ? cart.items.reduce((accumulator, item) => {
        return accumulator + item.quantity;
      }, 0)
    : 0;
};

const CartReducer = {
  getCartTotal,
  getItemTotal,
  getCartTotalQuantity,
};

Object.freeze(CartReducer);

export default CartReducer;
