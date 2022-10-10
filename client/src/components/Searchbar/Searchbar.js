import React, {useState} from 'react';
import Card from '../Card/Card';
import {Form, Button} from 'react-bootstrap'
import styles from './Searchbar.module.css';
const Searchbar = ({ query, setQuery }) => {
  /**
   * when search is submitted update the value search in the query object to the current value of the input text
   *
   */
  const [keyword, setKeyword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    if(keyword.trim()){
      history.push(`/search/${keyword}`)
    }
    else{
      history.push('/')
    }

  }

  return (
    <form className={styles.form}>
      <button className={styles.button} type="submit">
        <i className="fa-light fa-magnifying-glass fa-lg"></i>
      </button>
      <input type="text" placeholder="Search" className={styles.input} />
    </form>
  );
};

export default Searchbar;
