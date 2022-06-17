import React from 'react';
import styles from './SideBar.module.css';
const SideBar = () => {
  return (
    <ul className={styles.nav}>
      <li>Apetizers</li>
      <li>Drinks</li>
      <li>Side Orders</li>
      <li>Fried Rice</li>
      <li>Chicken</li>
      <li>Pork</li>
      <li>Beef</li>
      <li>SeaFood</li>
      <li>Soup</li>
      <li>Lo Mein</li>
      <li>Chow Mein</li>
      <li>Egg Foo Young</li>
      <li>Sweet & Sour</li>
      <li>Chop Suey</li>
      <li>Died Dishes</li>
      <li>Special Combinations</li>
    </ul>
  );
};

export default SideBar;
