import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NotSignedIn from './NotSignedIn/NotSignedIn';
import SignedIn from './SignedIn/SignedIn';
import styles from './Navbar.module.css';
import CartButton from '../Button/CartButton/CartButton';
const Navbar = ({ user, cart, setIsCheckoutOpen, setUser, setError }) => {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  return (
    <nav className="flex bg-red-700 text-white items-center p-1 justify-center">
      <div className="container flex items-center">
        <button className="p-2" onClick={() => setIsBurgerOpen((c) => !c)}>
          <i class="fa-regular fa-bars fa-lg"></i>
        </button>
        <Link to="/" className="text-lg font-semibold py-2">
          China Garden
        </Link>
        <div className="flex items-center ml-auto">
          <div
            className={`navbar-collapse ${styles.navContent}`}
            id="navbarContent"
          >
            {user ? (
              <SignedIn user={user} setUser={setUser} setError={setError} />
            ) : (
              <NotSignedIn />
            )}
          </div>
          <div className={`lg:hidden ${styles.cartButton}`}>
            <CartButton cart={cart} setIsCheckoutOpen={setIsCheckoutOpen} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
