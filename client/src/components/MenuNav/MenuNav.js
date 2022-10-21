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
    'soups',
    'drinks',
    'side_orders',
    'fried_rice',
    'diet_dishes',
    'lo_mein_and_chow_mei_fun',
    'chicken',
    'pork',
    'beef',
    'combo',
    'lunch',
    'chow_mein',
    'chop_suey',
    'egg_foo_young',
    'sweet_and_sour',
    'seafood',
    'chefspecials',
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
          id="soup"
          className={`${category === 'soup' ? styles.active : ''} ${
            styles.listLink
          }`}
          onClick={changeCategory}
        >
          Soup
        </button>
      </li>

      <li className={styles.listItem}>
        <button
          id="chow_mein"
          className={`${category === 'chow_mein' ? styles.active : ''} ${
            styles.listLink
          }`}
          onClick={changeCategory}
        >
          Chow Mein
        </button>
      </li>
      <li className={styles.listItem}>
        <button
          id="chop_suey"
          className={`${category === 'chop_suey' ? styles.active : ''} ${
            styles.listLink
          }`}
          onClick={changeCategory}
        >
          Chop Suey
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
          id="lo_mein_or_chow_mei_fun"
          className={`${category === 'lo_mein_or_chow_mei_fun' ? styles.active : ''} ${
            styles.listLink
          }`}
          onClick={changeCategory}
        >
         Lo Mein or Chow Mei Fun
        </button>
      </li>


      <li className={styles.listItem}>
        <button
          id="egg_foo_young"
          className={`${category === 'egg_foo_young' ? styles.active : ''} ${
            styles.listLink
          }`}
          onClick={changeCategory}
        >
          Egg Foo Young
        </button>
      </li>     
      <li className={styles.listItem}>
        <button
          id="sweet_and_sour"
          className={`${category === 'sweet_and_sour' ? styles.active : ''} ${
            styles.listLink
          }`}
          onClick={changeCategory}
        >
          Sweet & Sour
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
      <li className={styles.listItem}>
        <button
          id="pork"
          className={`${category === 'pork' ? styles.active : ''} ${
            styles.listLink
          }`}
          onClick={changeCategory}
        >
          Pork
        </button>
      </li>
      <li className={styles.listItem}>
        <button
          id="beef"
          className={`${category === 'beef' ? styles.active : ''} ${
            styles.listLink
          }`}
          onClick={changeCategory}
        >
          Beef
        </button>
      </li>
      <li className={styles.listItem}>
        <button
          id="chefspecials"
          className={`${category === 'chefspecials' ? styles.active : ''} ${
            styles.listLink
          }`}
          onClick={changeCategory}
        >
          Chef Specials 
        </button>
      </li>
      <li className={styles.listItem}>
        <button
          id="seafood"
          className={`${category === 'seafood' ? styles.active : ''} ${
            styles.listLink
          }`}
          onClick={changeCategory}
        >
          Seafood
        </button>
      </li>
      <li className={styles.listItem}>
        <button
          id="combo"
          className={`${category === 'combo' ? styles.active : ''} ${
            styles.listLink
          }`}
          onClick={changeCategory}
        >
          Special Combination Platters
        </button>
      </li>

      <li className={styles.listItem}>
        <button
          id="lunch"
          className={`${category === 'lunch' ? styles.active : ''} ${
            styles.listLink
          }`}
          onClick={changeCategory}
        >
          Lunch Special Combination Platters
        </button>
      </li>

      <li className={styles.listItem}>
        <button
          id="diet_dishes"
          className={`${category === 'diet_dishes' ? styles.active : ''} ${
            styles.listLink
          }`}
          onClick={changeCategory}
        >
          Diet Dishes
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


    </ul>
  );
};

export default MenuNav;
