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
    isBurgerOpen && (
      <>
        <div className="modalBackdrop z-30" onClick={closeCanvas}></div>
        <Card
          classes={`z-50 w-full sm:w-7/12 md:w-5/12 lg:w-3/12 xl:w-3/12 top-0 fixed duration-200 ease-out overflow-y-auto h-full text-black ${
            isBurgerOpen ? "left-0 block" : "right-full hidden"
          }`}
          borderRadius=""
          padding="p-0"
        >
          <div className="flex border-b px-3 py-1">
            <Link
              to="/"
              className="text-lg font-semibold py-2  focus:outline outline-2 outline-offset-2 outline-red-600"
            >
              China Garden
            </Link>
            <button
              className="p-1 ml-auto  focus:outline outline-2 outline-offset-2 outline-red-600  "
              onClick={closeCanvas}
            >
              <i className="fa-solid fa-x" onClick={closeCanvas}></i>
            </button>
          </div>
          <div>
            <ul className="border-basdf">
              <li>
                <Link
                  to="/"
                  className="py-3 px-5 hover:text-red-700 hover:underline hover:bg-slate-50 w-full text-start block  focus:outline outline-2 outline-offset-2 outline-red-600"
                  onClick={() => setIsBurgerOpen(false)}
                  autoFocus={true}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="py-3 px-5 hover:text-red-700 hover:underline hover:bg-slate-50 w-full text-start block  focus:outline outline-2 outline-offset-2 outline-red-600"
                  onClick={() => setIsBurgerOpen(false)}
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className="py-3 px-5 hover:text-red-700 hover:underline hover:bg-slate-50 w-full text-start block  focus:outline outline-2 outline-offset-2 outline-red-600"
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
      </>
    )
  );
};

export default MenuCanvas;
