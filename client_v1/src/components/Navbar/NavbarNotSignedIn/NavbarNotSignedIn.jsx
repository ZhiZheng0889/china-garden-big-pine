import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import ErrorAlertFixed from "../../../errors/ErrorAlertFixed/ErrorAlertFixed";

const NavbarNotSignedIn = () => {
  const { loginWithRedirect, error = null } = useAuth0();
  console.log(error);
  return (
    <>
      <ul className="flex gap-3 items-center">
        <li>
          <Link
            to="/"
            className="p-2 hover:text-amber-200 duration-200 ease-out"
          >
            Home
          </Link>
        </li>
        <li>
          <button
            onClick={() => loginWithRedirect()}
            className="p-2 hover:text-amber-200 duration-200 ease-out"
          >
            Login
          </button>
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
    </>
  );
};

export default NavbarNotSignedIn;
