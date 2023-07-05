import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const NavbarNotSignedIn = ({ className = "", childClassName = "" }) => {
  const { loginWithRedirect, error = null } = useAuth0();
  return (
    <>
      <ul className={`${className && className + " "}flex gap-3 items-center`}>
        <li>
          <Link
            to="/home-route"
            className={`${
              childClassName && childClassName + " "
            }p-2 hover:text-amber-200 duration-200 ease-out  focus:outline outline-2 outline-offset-2 outline-white`}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/"
            className={`${
              childClassName && childClassName + " "
            }p-2 hover:text-amber-200 duration-200 ease-out  focus:outline outline-2 outline-offset-2 outline-white`}
          >
            Menu
          </Link>
        </li>
        <li>
          <Link
            to="/orders"
            className={`${
              childClassName && childClassName + " "
            }p-2 hover:text-amber-200 duration-200 ease-out  focus:outline outline-2 outline-offset-2 outline-white`}
          >
            Orders
          </Link>
        </li>
        {/* <li>
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
        </li> */}
      </ul>
    </>
  );
};

export default NavbarNotSignedIn;
