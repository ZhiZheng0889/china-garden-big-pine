import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Home/Home';
import NotFound from './NotFound/NotFound';
const PageRoutes = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default PageRoutes;
