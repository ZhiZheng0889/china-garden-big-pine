import React from 'react';
import styles from './OpenedMenu.module.css';
const OpenedMenu = ({ category, changeCategory }) => {
  const categories = [
    'appetizers',
    'soup',
    'drinks',
    'side_orders',
    'fried_rice',
    'diet_dishes',
    'lo_mein_or_chow_mei_fun',
    'chicken',
    'pork',
    'beef',
    'chow_mein',
    'chop_suey',
    'egg_foo_young',
    'sweet_and_sour',
    'seafood',
    'chef_special',
    'combo',
    'lunch',
  ];
  return (
    <>
      <ul className={styles.list}>
        {categories.map((cat) => {
          const text = cat
            .split('_')
            .map((word) => word[0].toUpperCase() + word.slice(1))
            .join(' ');
          return (
            <li className={styles.listItem} key={cat}>
              <button
                id={cat}
                className={`${category === cat ? styles.active : ''} ${
                  styles.listLink
                }`}
                onClick={changeCategory}
              >
                {text}
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default OpenedMenu;
