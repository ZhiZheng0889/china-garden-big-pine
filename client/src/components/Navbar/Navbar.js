import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NotSignedIn from './NotSignedIn/NotSignedIn';
import SignedIn from './SignedIn/SignedIn';
import styles from './Navbar.module.css';
import CartButton from '../Button/CartButton/CartButton';
const Navbar = ({ user, cart, setIsCheckoutOpen }) => {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  return (
    <nav className="flex bg-red-700 text-white items-center p-1 justify-center">
      <div className="container flex items-center justify-between">
        <div
          className={`${styles.burger} burger-menu ${
            isBurgerOpen ? 'opened' : ''
          }`}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle Navigation"
          onClick={() => setIsBurgerOpen((curr) => !curr)}
        >
          <div className="burger"></div>
        </div>
        <Link to="/" className="text-lg font-semibold">
          China Garden
        </Link>
        <div className="flex items-center">
          <div
            className={`navbar-collapse ${styles.navContent}`}
            id="navbarContent"
          >
            {user ? <SignedIn /> : <NotSignedIn />}
          </div>
          <div className={styles.cartButton}>
            <CartButton cart={cart} setIsCheckoutOpen={setIsCheckoutOpen} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
