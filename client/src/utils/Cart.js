import { objectIsEqual } from './objectEquality';

export class Cart {
  /*
    get index of object inside of cart object.
    If not found in cart, return -1
  */
  static getIndex(item, cart) {
    return cart.findIndex((cartItem) => {
      return objectIsEqual(item, cartItem, ['quantity', 'total'], {
        specialRequest: (obj1, obj2) => {
          if (
            obj1.specialRequest.toLowerCase() !==
            obj2.specialRequest.toLowerCase()
          ) {
            return false;
          }
        },
      });
    });
  }

  static add(item, cart, setCart) {
    const index = this.getIndex(item, cart);
    if (index >= 0) {
      if (
        cart[index].specialRequest.toLowerCase() ===
        item.specialRequest.toLowerCase()
      ) {
        this.updateQuantity(index, 1, cart, setCart);
      } else {
        setCart((curr) => [...curr, item]);
      }
    } else {
      setCart((curr) => [...curr, item]);
    }
  }

  static remove(index, setCart) {
    if (index >= 0) {
      setCart((curr) => {
        return curr.filter((_, i) => i !== index);
      });
    }
  }

  static update(index, updatedItem, setCart) {
    if (index >= 0) {
      setCart((curr) => {
        return curr.map((curr, i) => (i === index ? updatedItem : curr));
      });
    }
  }

  static updateQuantity(index, amount, cart, setCart) {
    const updatedQuantity = cart[index];
    const { option = 1, size = 1 } = cart[index];
    updatedQuantity.quantity += amount;
    this.update(index, updatedQuantity, setCart);
  }

  static getCartTotal(cart) {
    return (
      (Array.isArray(cart) &&
        cart.reduce(
          (accumulator, item) => accumulator + item.total * item.quantity,
          0
        )) ||
      0
    );
  }

  static getItemTotal(index, cart) {
    const cartItem = cart[index];
    const currentOptionPrice = cartItem.currentOption?.upCharge || 0;
    const currentSizePrice = cartItem.currentSize?.upCharge || 0;
    const total =
      (cartItem.base_price + currentOptionPrice + currentSizePrice) *
      cartItem.quantity;
    return total;
  }

  static clearCart(setCart) {
    setCart([]);
  }
}
