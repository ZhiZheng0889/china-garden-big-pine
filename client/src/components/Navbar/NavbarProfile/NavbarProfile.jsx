import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import OutsideAlerter from "../../../hooks/useOutsideAlerter";
import { storage } from "../../../utils/Storage";
const NavbarProfile = ({ isOpen, setIsOpen, user, setUser }) => {
  const navigate = useNavigate();
  const logout = async () => {
    storage.local.remove("refreshToken");
    setUser({});
    navigate("/");
  };
  return (
    isOpen && (
      <OutsideAlerter setState={setIsOpen}>
        <ul
          className="absolute top-[110%] right-0 border rounded bg-white text-black z-50"
          tabIndex="-1"
        >
          <li>
            <Link
              to="/settings"
              className="px-3 py-2 w-24 text-center block hover:bg-slate-100 active:bg-slate-200 focus:outline outline-2 outline-offset-2 outline-red-500"
              onClick={() => setIsOpen(false)}
            >
              Settings
            </Link>
          </li>
          <li>
            <button
              onClick={logout}
              className="px-3 py-2 w-24 text-center block hover:bg-slate-100 active:bg-slate-200 focus:outline outline-2 outline-offset-2 outline-red-500"
            >
              Log out
            </button>
          </li>
        </ul>
      </OutsideAlerter>
    )
  );
};

export default NavbarProfile;
