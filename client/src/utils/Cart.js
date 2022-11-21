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
            !obj1.specialRequest.toLowerCase() ===
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

  static remove(item, cart, setCart) {
    const index = this.getIndex(item, cart);
    if (index >= 0) {
      setCart((curr) => {
        return curr.splice(index, 1);
      });
    }
  }
}
