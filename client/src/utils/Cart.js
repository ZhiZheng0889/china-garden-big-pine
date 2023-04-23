import { objectIsEqual } from "./objectEquality";

export class Cart {
  /*
    get index of object inside of cart object.
    If not found in cart, return -1
  */
  static getIndex(item, cart) {
    return cart.findIndex((cartItem) => {
      return objectIsEqual(item, cartItem, ["quantity", "total"], {
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
    return Array.isArray(cart)
      ? cart.reduce((accumulator, item) => {
          let currentOptionPrice = 0;
          let currentSizePrice = 0;
          if (item.selectedOption) {
            currentOptionPrice =
              item.options[item.selectedOption].upCharge || 0;
          }
          if (item.selectedSize) {
            currentSizePrice = item.sizes[item.selectedSize].upCharge || 0;
          }
          const total =
            (item.food.basePrice + currentOptionPrice + currentSizePrice) *
            item.quantity;
          return accumulator + total;
        }, 0)
      : 0;
  }

  static getItemTotal(index, cart) {
    const cartItem = cart[index];
    let optionTotal = 0;
    let sizeTotal = 0;
    if (optionTotal) {
      optionTotal = cartItem.food.options[cartItem.selectedOption];
    }
    if (sizeTotal) {
      sizeTotal = cartItem.food.sizes[cartItem.selectedSize];
    }
    const total =
      (cartItem.food.basePrice + optionTotal + sizeTotal) * cartItem.quantity;
    return total;
  }

  static clearCart(setCart) {
    setCart([]);
  }
}
