import React from "react";
import { Link } from "react-router-dom";
const NavbarSignedIn = () => {
  return (
    <ul className="flex gap-3 items-center">
      <li>
        <Link to="/" className="p-2 hover:text-amber-200 duration-200 ease-out">
          Home
        </Link>
      </li>
      <li>
        <Link
          to="/orders"
          className="p-2 hover:text-amber-200 duration-200 ease-out"
        >
          Orders
        </Link>
      </li>
      <li>
        <Link
          to="/logout"
          className="p-2 hover:text-amber-200 duration-200 ease-out"
        >
          Logout
        </Link>
      </li>
    </ul>
  );
};

export default NavbarSignedIn;
