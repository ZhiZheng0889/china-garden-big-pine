import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const NavbarSignedIn = () => {
  const { logout } = useAuth0();
  return (
    <ul className="flex gap-3 items-center">
      <li>
        <Link
          to="/home-route"
          className="p-2 hover:text-amber-200 duration-200 ease-out"
        >
          Home
        </Link>
      </li>
      <li>
        <Link to="/" className="p-2 hover:text-amber-200 duration-200 ease-out">
          Menu
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
        <button
          onClick={() =>
            logout({ logoutParams: { returnTo: window.location.origin } })
          }
          className="p-2 hover:text-amber-200 duration-200 ease-out"
        >
          Logout
        </button>
      </li>
    </ul>
  );
};

export default NavbarSignedIn;
