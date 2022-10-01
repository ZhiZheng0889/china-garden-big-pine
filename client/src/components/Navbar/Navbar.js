import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NotSignedIn from './NotSignedIn/NotSignedIn';
import SignedIn from './SignedIn/SignedIn';
import styles from './Navbar.module.css';
const Navbar = ({ user }) => {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  return (
    <nav className={styles.navbar}>
      <div
        className={`d-lg-none burger-menu ${isBurgerOpen ? 'opened' : ''}`}
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
      <div className="collapse navbar-collapse" id="navbarContent">
        {user ? <SignedIn /> : <NotSignedIn />}
      </div>
      {/* implement a cart button on mobile */}
    </nav>
  );
};

export default Navbar;
