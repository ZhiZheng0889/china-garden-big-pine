import React, { useState } from "react";
import { Link } from "react-router-dom";
import NotSignedIn from "./NotSignedIn/NotSignedIn";
import SignedIn from "./SignedIn/SignedIn";
import CartButton from "../Button/CartButton/CartButton";
import CheckoutCanvas from "../Checkout/CheckoutCanvas/CheckoutCanvas";
import MenuCanvas from "./MenuCanvas/MenuCanvas";
import { isObjectEmpty } from "../../utils/isObjectEmpty";
import { useDisableBodyScroll } from "../../hooks/useDisableBodyScroll";
const Navbar = ({
  user,
  cart,
  setCart,
  setUser,
  setError,
  category,
  setCategory,
}) => {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  useDisableBodyScroll(isCheckoutOpen);
  useDisableBodyScroll(isBurgerOpen);
  return (
    <nav className="flex bg-red-700 text-white items-center p-2 justify-center">
      <div className="container flex items-center gap-2">
        <button
          className="p-2 md:hidden hover:bg-red-800 rounded focus:outline outline-2 outline-offset-2 outline-white"
          onClick={() => setIsBurgerOpen((c) => !c)}
        >
          <i className="fa-solid fa-bars fa-lg"></i>
        </button>
        <Link
          to="/"
          className="text-lg font-semibold py-2 focus:outline outline-2 outline-offset-2 outline-white"
        >
          China Garden
        </Link>
        <div className="flex items-center ml-auto">
          <div className="hidden md:block" id="navbarContent">
            <NotSignedIn />
          </div>
          <div className="xl:hidden ml-3">
            <CartButton cart={cart} setIsCheckoutOpen={setIsCheckoutOpen} />
          </div>
        </div>
        <CheckoutCanvas
          cart={cart}
          setCart={setCart}
          isCheckoutOpen={isCheckoutOpen}
          setIsCheckoutOpen={setIsCheckoutOpen}
        />
        <MenuCanvas
          isBurgerOpen={isBurgerOpen}
          setIsBurgerOpen={setIsBurgerOpen}
          category={category}
          setCategory={setCategory}
          user={user}
          setUser={setUser}
        />
      </div>
    </nav>
  );
};

export default Navbar;
