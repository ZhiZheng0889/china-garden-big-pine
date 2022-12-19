import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Home/Home';
import Admin from './Admin/Admin';
import NotFound from './NotFound/NotFound';
import Login from './Login/Login';
import Signup from './Signup/Signup';
import Checkout from './Checkout/Checkout';
import Receipt from './Receipt/Receipt';

const PageRoutes = ({ cart, setCart, isCheckoutOpen, setIsCheckoutOpen }) => {
  return (
    <Routes>
      <Route
        index
        element={
          <Home
            cart={cart}
            setCart={setCart}
            isCheckoutOpen={isCheckoutOpen}
            setIsCheckoutOpen={setIsCheckoutOpen}
          />
        }
      />
      <Route
        path="/checkout"
        element={<Checkout cart={cart} setCart={setCart} />}
      />
      <Route path="/receipt" element={<Receipt />} />
      <Route path="/admin" element={<Admin user={{}} />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" elemnt={<Signup />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default PageRoutes;
