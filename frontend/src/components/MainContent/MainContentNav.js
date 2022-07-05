import React from 'react';
import styles from './MainContentNav.module.css';
const MainContentNav = () => {
  return (
    <nav className={styles.nav}>
      <ul>
        <li className={styles.active}>Menu</li>
        <li>Reviews</li>
        <li>Info</li>
      </ul>
    </nav>
  );
};

export default MainContentNav;
