import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NotSignedIn from './NotSignedIn/NotSignedIn';
import SignedIn from './SignedIn/SignedIn';
import CartButton from '../Button/CartButton/CartButton';
import CheckoutCanvas from '../Checkout/CheckoutCanvas/CheckoutCanvas';
import MenuCanvas from './MenuCanvas/MenuCanvas';
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
  return (
    <nav className="flex bg-red-700 text-white items-center p-1 justify-center">
      <div className="container flex items-center">
        <button
          className="p-2 md:hidden"
          onClick={() => setIsBurgerOpen((c) => !c)}
        >
          <i className="fa-regular fa-bars fa-lg"></i>
        </button>
        <Link to="/" className="text-lg font-semibold py-2">
          China Garden
        </Link>
        <div className="flex items-center ml-auto">
          <div className="hidden md:block" id="navbarContent">
            {user ? (
              <SignedIn user={user} setUser={setUser} setError={setError} />
            ) : (
              <NotSignedIn />
            )}
          </div>
          <div className="xl:hidden">
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
        />
      </div>
    </nav>
  );
};

export default Navbar;
