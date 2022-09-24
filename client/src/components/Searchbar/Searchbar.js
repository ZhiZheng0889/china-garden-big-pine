import React from 'react';
import Card from '../Card/Card';
import styles from './Searchbar.module.css';
const Searchbar = () => {
  return (
    <Card>
      <form className={styles.form}>
        <button className={styles.button}>
          <i className="fa-light fa-magnifying-glass fa-lg"></i>
        </button>
        <input
          type="text"
          placeholder="Search"
          className={`form-control ${styles.input}`}
        />
      </form>
    </Card>
  );
};

export default Searchbar;
