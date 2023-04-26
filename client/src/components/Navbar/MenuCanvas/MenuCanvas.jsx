import React from "react";
import Card from "../../Card/Card";
import SideNav from "../../Nav/SideNav/SideNav";
import { Link } from "react-router-dom";
const MenuCanvas = ({
  isBurgerOpen,
  setIsBurgerOpen,
  category,
  setCategory,
  is,
}) => {
  const closeCanvas = () => {
    setIsBurgerOpen(false);
  };
  return (
    <div
      className={`xl:hidden z-30 ease-out duration-300 ${
        isBurgerOpen ? "left-0 block" : "right-full hidden"
      }`}
    >
      <div className="modalBackdrop"></div>

      <Card
        classes={`z-50 w-full sm:w-7/12 md:w-5/12 lg:w-3/12 xl:w-3/12 top-0 fixed overflow-y-auto h-full text-black ${
          isBurgerOpen ? "left-0 block" : "right-full hidden"
        }`}
        borderRadius=""
        padding="p-0"
      >
        <div className="flex border-b px-3 py-1">
          <Link to="/" className="text-lg font-semibold py-2">
            China Garden
          </Link>
          <button className="p-1 ml-auto" onClick={closeCanvas}>
            <i className="fa-solid fa-x" onClick={closeCanvas}></i>
          </button>
        </div>
        <div>
          <ul className="border-basdf">
            <li>
              <Link
                to="/"
                className="py-3 px-5 hover:text-red-700 hover:underline hover:bg-slate-50 w-full text-start block"
                onClick={() => setIsBurgerOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="py-3 px-5 hover:text-red-700 hover:underline hover:bg-slate-50 w-full text-start block"
                onClick={() => setIsBurgerOpen(false)}
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/signup"
                className="py-3 px-5 hover:text-red-700 hover:underline hover:bg-slate-50 w-full text-start block"
                onClick={() => setIsBurgerOpen(false)}
              >
                Signup
              </Link>
            </li>
          </ul>
          <h4 className="px-5 py-3 font-semibold border-b">Categories</h4>
          <SideNav
            category={category}
            setCategory={setCategory}
            setIsBurgerOpen={setIsBurgerOpen}
          />
        </div>
      </Card>
    </div>
  );
};

export default MenuCanvas;
