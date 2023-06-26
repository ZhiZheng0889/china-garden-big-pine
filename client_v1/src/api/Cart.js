import Api from "./Api";

const addToCart = async (cartItem, cart_id) => {
  const updatedCart = await Api.put("/add", {
    item: cartItem,
    cart_id,
  });
  return updatedCart;
};

const getCart = async (cart_id) => {};

const removeFromCart = async (cartItemIndex, cart_id) => {};

const updateQuantity = async (quantity, cartItemIndex, cart_id) => {};

const updateSpecialRequest = async (
  specialRequest,
  cartItemIndex,
  cart_id
) => {};

const updateCartItemOption = async (option, cartItemIndex, cart_id) => {};

const updateCartItemSize = async (size, cartItemIndex, cart_id) => {};

const Cart = {
  addToCart,
};

Object.freeze(Cart);
export default Cart;
