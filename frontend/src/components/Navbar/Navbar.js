import React from 'react';
import { Link } from 'react-router-dom';
import OffCanvasButton from '../OffCanvasNav/OffCanvasButton';
import OffCanvasNav from '../OffCanvasNav/OffCanvasNav';
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav
      class={`fixed-top navbar-light bg-light border-bottom ${styles.navbar}`}
    >
      <div class="container">
        <div className="d-block d-lg-none">
          <OffCanvasButton />
          <OffCanvasNav />
        </div>

        <Link to="/" className={styles.brand}>
          <h1 class="navbar-brand">Big Pine Restaurant</h1>
        </Link>

        <ul class={`d-none d-lg-flex ${styles.navHelp}`}>
          <li>
            <Link to="/" class={styles.navLink}>
              Home
            </Link>
          </li>
          <li>
            <a href="#" class={styles.navLink}>
              Sign up
            </a>
          </li>
          <li>
            <a href="#" class={styles.navLink}>
              Sign In
            </a>
          </li>
        </ul>
        <a
          href="#"
          className={`d-block d-xl-none rounded-pill btn-3d ${styles.navLink} ${styles.cartButton}`}
        >
          <i class="fa-solid fa-cart-shopping me-2"></i> 0
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
