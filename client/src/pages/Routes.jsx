import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Home/Home';
import Admin from './Admin/Admin';
import NotFound from './NotFound/NotFound';
import Login from './Login/Login';
import Signup from './Signup/Signup';
import Checkout from './Checkout/Checkout';
import Receipt from './Receipt/Receipt';
import Profile from './Profile/Profile';
import Order from './Order/Order';

const PageRoutes = ({
  cart,
  setCart,
  user,
  setUser,
  category,
  setCategory,
}) => {
  return (
    <Routes>
      <Route
        index
        element={
          <Home
            cart={cart}
            setCart={setCart}
            category={category}
            setCategory={setCategory}
          />
        }
      />
      <Route path="/order/:order_id" element={<Order />} />
      <Route
        path="/checkout"
        element={
          <Checkout
            cart={cart}
            setCart={setCart}
            user={user}
            setUser={setUser}
          />
        }
      />
      <Route path="/receipt" element={<Receipt />} />
      <Route path="/profile" element={<Profile user={user} />} />
      <Route path="/admin" element={<Admin user={{}} />} />
      <Route path="/login" element={<Login setUser={setUser} />} />
      <Route path="/signup" element={<Signup setUser={setUser} />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default PageRoutes;
