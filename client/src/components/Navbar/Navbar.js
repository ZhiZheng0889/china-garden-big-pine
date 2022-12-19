import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NotSignedIn from './NotSignedIn/NotSignedIn';
import SignedIn from './SignedIn/SignedIn';
import styles from './Navbar.module.css';
import CartButton from '../Button/CartButton/CartButton';
const Navbar = ({ user, cart, setIsCheckoutOpen }) => {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  return (
    <nav className={styles.navbar}>
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
      <Link to="/" className={styles.brand}>
        China Garden
      </Link>
      <div
        className={`collapse navbar-collapse ${styles.navContent}`}
        id="navbarContent"
      >
        {user ? <SignedIn /> : <NotSignedIn />}
      </div>
      <div className={styles.cartButton}>
        <CartButton cart={cart} setIsCheckoutOpen={setIsCheckoutOpen} />
      </div>
    </nav>
  );
};

export default Navbar;
