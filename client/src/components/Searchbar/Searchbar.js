import React from 'react';
import Card from '../Card/Card';
import styles from './Searchbar.module.css';
const Searchbar = ({ query, setQuery }) => {
  /**
   * when search is submitted update the value search in the query object to the current value of the input text
   *
   */

  return (
    <form className={styles.form}>
      <button className={styles.button}>
        <i
          className="fa-light fa-magnifying-glass fa-lg"
          onClick={handleSubmit}
        ></i>
      </button>
      <input type="text" placeholder="Search" className={styles.input} />
    </form>
  );
};

export default Searchbar;
