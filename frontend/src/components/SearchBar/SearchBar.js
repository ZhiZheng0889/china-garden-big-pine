import React from 'react';
import styles from './SearchBar.module.css';
const SearchBar = () => {
  return (
    <form className={styles.form}>
      <div class="input-group">
        <input
          type="text"
          class="form-control"
          placeholder="Enter Food"
          aria-label="Enter Food"
          aria-describedby="basic-addon1"
        />
        <button class={`input-group-text ${styles.button}`} id="basic-addon1">
          <i class="fa-regular fa-magnifying-glass"></i>
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
