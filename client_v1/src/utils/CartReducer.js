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

const CartReducer = {
  getCartTotal,
  getItemTotal,
};

Object.freeze(CartReducer);

export default CartReducer;
