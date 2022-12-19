import React, { useEffect, useState } from 'react';
import PageRoutes from './pages/Routes';
import Navbar from './components/Navbar/Navbar';
import { storage } from './utils/Storage';
function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  // mobile checkout responsiveness
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  // check if anything is in storage for cart
  useEffect(() => {
    const foundCart = storage.local.get('cart');
    if (foundCart) {
      const parsedCart = JSON.parse(foundCart);
      if (Array.isArray(parsedCart) && parsedCart.length > 0) {
        setCart(JSON.parse(foundCart));
      }
    }
  }, []);

  // save to local storage any time the cart is changed
  useEffect(() => {
    storage.local.set('cart', JSON.stringify(cart));
  }, [cart]);
  return (
    <>
      <header>
        <Navbar user={user} cart={cart} setIsCheckoutOpen={setIsCheckoutOpen} />
      </header>
      <PageRoutes
        cart={cart}
        setCart={setCart}
        isCheckoutOpen={isCheckoutOpen}
        setIsCheckoutOpen={setIsCheckoutOpen}
      />
    </>
  );
}

export default App;
