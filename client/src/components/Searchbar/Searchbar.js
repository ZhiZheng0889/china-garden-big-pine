import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../Card/Card';
import { Form, Button } from 'react-bootstrap';
import styles from './Searchbar.module.css';
const Searchbar = ({ search, setSearch }) => {
  /**
   * when search is submitted update the value search in the query object to the current value of the input text
   *
   */
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    setSearch(keyword);
    // if (keyword.trim()) {
    //   navigate(`/search/${keyword}`);
    // } else {
    //   navigate('/');
    // }
  };
  const onChange = ({ target }) => {
    setKeyword(target.value);
  };

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <button className={styles.button} type="submit">
        <i className="fa-light fa-magnifying-glass fa-lg"></i>
      </button>
      <input
        type="search"
        placeholder="Search"
        className={styles.input}
        value={keyword}
        onChange={onChange}
      />
    </form>
  );
};

export default Searchbar;
