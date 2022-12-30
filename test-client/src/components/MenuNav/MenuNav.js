import React from 'react';
import { Link } from 'react-router-dom';
import styles from './MenuNav.module.css';
import OpenedMenu from './OpenedMenu/OpenedMenu';
import ClosedMenu from './ClosedMenu/ClosedMenu';
const MenuNav = ({ category, setCategory }) => {
  // update category to the current id value of onClick
  const changeCategory = ({ target }) => {
    const { id } = target;
    setCategory(id);
  };
  return (
    <>
      <button className={styles.button}>
        <i className="fa-solid fa-bars-sort"></i>
      </button>
      <OpenedMenu category={category} changeCategory={changeCategory} />
      {/* <ClosedMenu category={category} changeCategory={changeCategory} /> */}
    </>
  );
};

export default MenuNav;
