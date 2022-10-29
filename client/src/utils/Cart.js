export class Cart {
  /*
    get index of object inside of cart object.
    If not found in cart, return -1
  */
  static getIndex(item, cart) {
    console.log(cart);
    return cart.findIndex((cartItem) => {
      console.log(item, cartItem);
      return (
        cartItem.name === item.name &&
        cartItem.specialRequest === item.specialRequest
      );
    });
  }

  static add(item, cart, setCart) {
    const index = this.getIndex(item, cart);
    if (index >= 0) {
      setCart((curr) => {
        curr[index].quantity += item.quantity;
        return curr;
      });
    } else {
      setCart((curr) => [...curr, item]);
    }
  }
}
