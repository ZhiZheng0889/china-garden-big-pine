import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import Checkout from "./Checkout/Checkout";
import Orders from "./Orders/Orders";
import Login from "./Login/Login";
import Signup from "./Signup/Signup";
import Settings from "./Settings/Settings";
import NotFound from "./NotFound/NotFound";
import Receipt from "./Receipt/Receipt";

const Pages = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="checkout" element={<Checkout />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="receipt/:order_id" element={<Receipt />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Pages;
