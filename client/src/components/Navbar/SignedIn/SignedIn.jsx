import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavbarProfile from "../NavbarProfile/NavbarProfile";

const SignedIn = ({ user, setUser, setError }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleProfile = () => {
    setIsProfileOpen((curr) => !curr);
  };
  console.log(isProfileOpen);
  return (
    <div className="relative">
      <ul className="flex items-center">
        <li className="px-3 py-2">
          <Link
            to="/"
            className="focus:outline outline-2 outline-offset-2 outline-white"
          >
            Home
          </Link>
        </li>
        <li className="px-3 py-2">
          <Link
            to="/profile/orders"
            className="focus:outline outline-2 outline-offset-2 outline-white"
          >
            Orders
          </Link>
        </li>
        <li>
          <button
            onClick={toggleProfile}
            className="px-3 py-2 focus:outline outline-2 outline-offset-2 outline-white"
            id="profile-icon"
          >
            <i className="fa-light fa-circle-user fa-lg" id="profile-icon"></i>
          </button>
        </li>
      </ul>
      <NavbarProfile
        isOpen={isProfileOpen}
        setIsOpen={setIsProfileOpen}
        user={user}
        setUser={setUser}
      />
    </div>
  );
};

export default SignedIn;
