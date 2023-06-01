import React from "react";
import { Link } from "react-router-dom";
const NavbarNotSignedIn = () => {
  return (
    <ul className="flex gap-3 items-center">
      <li>
        <Link to="/" className="p-2 hover:text-amber-200 duration-200 ease-out">
          Home
        </Link>
      </li>
      <li>
        <Link
          to="/login"
          className="p-2 hover:text-amber-200 duration-200 ease-out"
        >
          Login
        </Link>
      </li>
      <li>
        <Link
          to="/signup"
          className="p-2 hover:text-amber-200 duration-200 ease-out"
        >
          Signup
        </Link>
      </li>
    </ul>
  );
};

export default NavbarNotSignedIn;
