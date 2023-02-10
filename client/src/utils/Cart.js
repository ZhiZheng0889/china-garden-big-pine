import { objectIsEqual } from './objectEquality';

export class Cart {
  /*
    get index of object inside of cart object.
    If not found in cart, return -1
  */
  static getIndex(item, cart) {
    return cart.findIndex((cartItem) => {
      console.log(item, cartItem);
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
    console.log(cart);
    const index = this.getIndex(item, cart);
    if (index >= 0) {
      setCart((curr) => {
        const newArr = [...curr];
        newArr[index].quantity += item.quantity;
        newArr[index].total += item.total;
        return [...newArr];
      });
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

  static getItemTotal(index, cart) {}

  static clearCart(setCart) {
    setCart([]);
  }
}
