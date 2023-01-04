import React, { useEffect, useState } from 'react';
import PageRoutes from './pages/Routes';
import Navbar from './components/Navbar/Navbar';
import { UserApi } from './api/userApi';
import { storage } from './utils/Storage';
function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  // mobile checkout responsiveness
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  useEffect(() => {
    // check if anything is in storage for cart
    const foundCart = storage.local.get('cart');
    if (foundCart) {
      const parsedCart = JSON.parse(foundCart);
      if (Array.isArray(parsedCart) && parsedCart.length > 0) {
        setCart(JSON.parse(foundCart));
      }
    }
    // check if user has been logged in
    const foundRefreshToken = storage.local.get('refreshToken');
    if (foundRefreshToken) {
      const getUser = async () => {
        try {
          const response = await UserApi.loginToken(foundRefreshToken);
          if (response) {
            setUser(response);
            storage.local.set('refreshToken', response.refreshToken);
          }
        } catch (error) {
          console.log(error);
        }
      };
      getUser();
    }
  }, []);

  // save session tokens
  useEffect(() => {
    if (user) {
      const { refreshToken = '' } = user;
      if (refreshToken) {
        const foundToken = storage.local.get('refreshToken');
        if (refreshToken !== foundToken) {
          storage.local.set('refreshToken', refreshToken);
        }
      }
    }
  }, [user]);

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
        user={user}
        setUser={setUser}
      />
    </>
  );
}

export default App;
