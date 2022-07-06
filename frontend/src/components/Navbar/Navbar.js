import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import OffCanvasButton from '../OffCanvasNav/OffCanvasButton';
import OffCanvasNav from '../OffCanvasNav/OffCanvasNav';
import Checkout from '../Checkout/Checkout';
import styles from './Navbar.module.css';
import OutsideAlerter from '../../hooks/OutsideAlerter';

const Navbar = ({ cart }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Modal for checkout button on mobile phones
  const checkoutModal = (
    <OutsideAlerter setState={setIsModalOpen}>
      <div className={styles.modal}>
        <Checkout />
      </div>
    </OutsideAlerter>
  );
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
        <div className={styles.modalContainer}>
          <button
            id="modal-toggle-btn"
            className={`d-block d-xl-none rounded-pill btn-3d ${styles.navLink} ${styles.cartButton}`}
            onClick={() => setIsModalOpen((curr) => !curr)}
          >
            <i className="fa-solid fa-cart-shopping me-2"></i>{' '}
            {(Array.isArray(cart) &&
              cart.reduce((acc, food) => acc + food.quantity, 0)) ||
              0}
          </button>
          {isModalOpen && checkoutModal}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
