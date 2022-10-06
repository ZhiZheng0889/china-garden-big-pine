import React from 'react';
import { Link } from 'react-router-dom';
import styles from './MenuNav.module.css';
const MenuNav = ({ query, setQuery }) => {
  // update query.category to the current id value of onClick
  const changeQuery = ({ target }) => {
    const { id } = target;
    setQuery((prevState) => {
      return { ...prevState, category: id };
    });
  };
  return (
    <ul className={styles.list}>
      <li className={styles.listItem}>
        <button
          id="appetizers"
          className={`${query.category === 'appetizers' ? styles.active : ''} ${
            styles.listLink
          }`}
          onClick={changeQuery}
        >
          Appetizers
        </button>
      </li>
      <li className={styles.listItem}>
        <button
          id="drinks"
          className={`${query.category === 'drinks' ? styles.active : ''} ${
            styles.listLink
          }`}
          onClick={changeQuery}
        >
          Drinks
        </button>
      </li>
      <li className={styles.listItem}>
        <button
          id="side_orders"
          className={`${
            query.category === 'side_orders' ? styles.active : ''
          } ${styles.listLink}`}
          onClick={changeQuery}
        >
          Side Orders
        </button>
      </li>
      <li className={styles.listItem}>
        <button
          id="fried_rice"
          className={`${query.category === 'fried_rice' ? styles.active : ''} ${
            styles.listLink
          }`}
          onClick={changeQuery}
        >
          Fried Rice
        </button>
      </li>
      <li className={styles.listItem}>
        <button
          id="chicken"
          className={`${query.category === 'chicken' ? styles.active : ''} ${
            styles.listLink
          }`}
          onClick={changeQuery}
        >
          Chicken
        </button>
      </li>
    </ul>
  );
};

export default MenuNav;
