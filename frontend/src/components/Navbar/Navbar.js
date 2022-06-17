import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav
      class={`fixed-top navbar-light bg-light border-bottom ${styles.navbar}`}
    >
      <div class="container">
        <Link to="/" className={styles.brand}>
          <h1 class="navbar-brand">Big Pine Restaurant</h1>
        </Link>

        <ul class={styles.navHelp}>
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
      </div>
    </nav>
  );
};

export default Navbar;
