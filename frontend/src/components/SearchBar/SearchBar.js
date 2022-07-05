import React from 'react';
import styles from './SearchBar.module.css';
const SearchBar = () => {
  return (
    <form className={styles.form}>
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Enter Food"
          aria-label="Enter Food"
          aria-describedby="basic-addon1"
        />
        <button
          className={`input-group-text ${styles.button}`}
          id="basic-addon1"
        >
          <i className="fa-regular fa-magnifying-glass"></i>
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
