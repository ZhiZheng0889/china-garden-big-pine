import React, { useEffect, useState } from 'react';
import PageRoutes from './pages/Routes';
import Navbar from './components/Navbar/Navbar';
import { UserApi } from './api/userApi';
import { storage } from './utils/Storage';
import ErrorAlert from './errors/ErrorAlert';
function App() {
  const [user, setUser] = useState({});
  const [cart, setCart] = useState([]);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState('appetizers');
  useEffect(() => {
    // check if anything is in storage for cart
    const foundCart = storage.local.get('cart');
    if (foundCart) {
      const parsedCart = JSON.parse(foundCart);
      if (Array.isArray(parsedCart) && parsedCart.length > 0) {
        const parsedCart = JSON.parse(foundCart);
        parsedCart.food_id = Number(parsedCart.food_id);
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
            storage.local.set('refreshToken', response.refreshToken);
            delete response.refreshToken;
            setUser(response);
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
        <ErrorAlert
          error={error}
          showClose={true}
          setError={setError}
          classes="rounded-none"
        />
        <Navbar
          user={user}
          cart={cart}
          setCart={setCart}
          setUser={setUser}
          setError={setError}
          category={category}
          setCategory={setCategory}
        />
      </header>
      <PageRoutes
        cart={cart}
        setCart={setCart}
        user={user}
        setUser={setUser}
        category={category}
        setCategory={setCategory}
      />
    </>
  );
}

export default App;
