import React from 'react';
import { Link } from 'react-router-dom';
import styles from './MenuNav.module.css';
const MenuNav = ({ category, setCategory }) => {
  // update category to the current id value of onClick
  const changeCategory = ({ target }) => {
    const { id } = target;
    setCategory(id);
  };
  const categories = [
    'appetizers',
    'drinks',
    'side orders',
    'fried rice',
    'diet dishes',
    'soup',
    'lo mein',
  ];
  console.log('category: ', category);
  return (
    <ul className={styles.list}>
      <li className={styles.listItem}>
        <button
          id="appetizers"
          className={`${category === 'appetizers' ? styles.active : ''} ${
            styles.listLink
          }`}
          onClick={changeCategory}
        >
          Appetizers
        </button>
      </li>
      <li className={styles.listItem}>
        <button
          id="drinks"
          className={`${category === 'drinks' ? styles.active : ''} ${
            styles.listLink
          }`}
          onClick={changeCategory}
        >
          Drinks
        </button>
      </li>
      <li className={styles.listItem}>
        <button
          id="side_orders"
          className={`${category === 'side_orders' ? styles.active : ''} ${
            styles.listLink
          }`}
          onClick={changeCategory}
        >
          Side Orders
        </button>
      </li>
      <li className={styles.listItem}>
        <button
          id="fried_rice"
          className={`${category === 'fried_rice' ? styles.active : ''} ${
            styles.listLink
          }`}
          onClick={changeCategory}
        >
          Fried Rice
        </button>
      </li>
      <li className={styles.listItem}>
        <button
          id="chicken"
          className={`${category === 'chicken' ? styles.active : ''} ${
            styles.listLink
          }`}
          onClick={changeCategory}
        >
          Chicken
        </button>
      </li>
    </ul>
  );
};

export default MenuNav;
