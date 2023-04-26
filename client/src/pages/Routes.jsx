import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import Admin from "./Admin/Admin";
import NotFound from "./NotFound/NotFound";
import Login from "./Login/Login";
import Signup from "./Signup/Signup";
import Checkout from "./Checkout/Checkout";
import Receipt from "./Receipt/Receipt";
import Profile from "./Profile/Profile";
import Order from "./Order/Order";
import Orders from "./Orders/Orders";
import FoodOptions from "./Admin/FoodOptions";
import Settings from "./Settings/Settings";

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
      {/* <Route path="/orders" element={<Orders user={user} />} />
      <Route path="/order/:order_id" element={<Order user={user} />} /> */}
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
      <Route path="/receipt/:order_id" element={<Receipt />} />
      <Route path="/profile/orders" element={<Orders user={user} />} />
      <Route
        path="/profile/orders/:order_id"
        element={<Receipt user={user} />}
      />
      <Route path="/profile" element={<Profile user={user} />} />
      <Route path="/admin" element={<Admin user={{}} />}>
        <Route path="/admin/food-options" element={<FoodOptions />} />
      </Route>
      <Route path="/login" element={<Login setUser={setUser} />} />
      <Route path="/signup" element={<Signup setUser={setUser} />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default PageRoutes;
