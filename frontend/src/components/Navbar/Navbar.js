import React from 'react';
import { Link } from 'react-router-dom';
import OffCanvasButton from '../OffCanvasNav/OffCanvasButton';
import OffCanvasNav from '../OffCanvasNav/OffCanvasNav';
import styles from './Navbar.module.css';

const Navbar = ({ cart }) => {
  return (
    <nav
      className={`fixed-top navbar-light bg-light border-bottom ${styles.navbar}`}
    >
      <div className="container">
        <div className="d-block d-lg-none">
          <OffCanvasButton />
          <OffCanvasNav />
        </div>

        <Link to="/" className={styles.brand}>
          <h1 className="navbar-brand">Big Pine Restaurant</h1>
        </Link>

        <ul className={`d-none d-lg-flex ${styles.navHelp}`}>
          <li>
            <Link to="/" className={styles.navLink}>
              Home
            </Link>
          </li>
          <li>
            <a href="#" className={styles.navLink}>
              Sign up
            </a>
          </li>
          <li>
            <a href="#" className={styles.navLink}>
              Sign In
            </a>
          </li>
        </ul>
        <a
          href="#"
          className={`d-block d-xl-none rounded-pill btn-3d ${styles.navLink} ${styles.cartButton}`}
        >
          <i className="fa-solid fa-cart-shopping me-2"></i>{' '}
          {cart.reduce((acc, food) => acc + food.quantity, 0)}
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
