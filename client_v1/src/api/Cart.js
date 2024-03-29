import Api from "./Api";

const addToCart = async (cartItem, cart_id = null) => {
  return await Api.put("cart/add", {
    item: cartItem,
    cart_id,
  });
};

const getCart = async (cart_id) => {
  return await Api.get(`cart/${cart_id}`);
};

const removeFromCart = async (cartItemIndex, cart_id) => {
  return await Api.delete(`cart/${cart_id}/remove/${cartItemIndex}`);
};

const updateQuantity = async (quantity, cartItemIndex, cart_id) => {
  return await Api.put(`cart/${cart_id}/update/${cartItemIndex}/quantity`, {
    item: { quantity },
  });
};

const clearCart = async (cart_id) => {
  return await Api.put(`cart/${cart_id}/clear-cart`);
};

const updateSpecialRequest = async (
  specialRequest,
  cartItemIndex,
  cart_id
) => {};

const updateCartItemOption = async (option, cartItemIndex, cart_id) => {};

const updateCartItemSize = async (size, cartItemIndex, cart_id) => {};

const Cart = {
  addToCart,
  getCart,
  updateQuantity,
  removeFromCart,
  clearCart,
};

Object.freeze(Cart);
export default Cart;
