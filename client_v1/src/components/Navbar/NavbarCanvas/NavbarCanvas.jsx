import FocusTrap from "focus-trap-react";
import React from "react";
import ButtonClear from "../../Button/ButtonClear/ButtonClear";
import FoodList from "../../Food/FoodList/FoodList";
import { Link } from "react-router-dom";
import FoodNav from "../../Food/FoodNav/FoodNav";
import NavbarNotSignedIn from "../NavbarNotSignedIn/NavbarNotSignedIn";

const NavbarCanvas = ({ isMenuOpen, setIsMenuOpen, showMenu = true }) => {
  const closeModal = () => {
    console.log("CLOSING");
    setIsMenuOpen(false);
  };

  return (
    isMenuOpen && (
      <>
        <div className="md:hidden modal-backdrop" onClick={closeModal}></div>
        <FocusTrap focusTrapOptions={{ initialFocus: "#navbar-header" }}>
          <div
            className={`md:hidden fixed z-50 border-r bg-white w-3/5 text-black ${
              isMenuOpen ? "left-0" : "right-full"
            } top-0 bottom-0 overflow-y-auto duration-200 ease-out`}
          >
            <header className="flex justify-between items-center border-b py-3 px-5">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                id="navbar-header"
              >
                <h3 className="text-lg font-semibold">China Garden</h3>
              </Link>
              <ButtonClear onClick={() => setIsMenuOpen(false)}>
                <i className="fa-solid fa-xmark"></i>
              </ButtonClear>
            </header>
            <div>
              <ul className="flex flex-col gap-0 items-start w-full border-b">
                <li className="w-full">
                  <Link
                    to="/home-route"
                    className="py-3 px-5 block hover:text-red-700 hover:underline hover:bg-gray-50 duration-200 ease-out"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Home
                  </Link>
                </li>
                <li className="w-full">
                  <Link
                    to="/"
                    className="w-full py-3 px-5 block hover:text-red-700 hover:underline hover:bg-gray-50 duration-200 ease-out"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Menu
                  </Link>
                </li>
                <li className="w-full">
                  <Link
                    to="/orders"
                    className="w-full py-3 px-5 block hover:text-red-700 hover:underline hover:bg-gray-50 duration-200 ease-out"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Orders
                  </Link>
                </li>
              </ul>
              {showMenu && (
                <>
                  <div className="border-b py-3 px-5">
                    <h4 className="font-semibold font-lg">Categories</h4>
                  </div>

                  <FoodNav setIsOpen={setIsMenuOpen} />
                </>
              )}
            </div>
          </div>
        </FocusTrap>
      </>
    )
  );
};

export default NavbarCanvas;
