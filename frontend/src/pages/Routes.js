import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Home/Home';
import Admin from './Admin/Admin';
import NotFound from './NotFound/NotFound';
import Login from './Login/Login';
import Signup from './Signup/Signup';
const PageRoutes = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default PageRoutes;
