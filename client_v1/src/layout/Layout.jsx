import React from "react";
import Pages from "../pages/Pages";
import Navbar from "../components/Navbar/Navbar";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header>
        <Navbar />
      </header>
      <Pages />
    </div>
  );
};

export default Layout;
