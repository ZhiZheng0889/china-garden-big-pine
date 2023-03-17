import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../Card/Card";
import styles from "./Searchbar.module.css";
const Searchbar = ({ search, setSearch }) => {
  /**
   * when search is submitted update the value search in the query object to the current value of the input text
   *
   */
  const [keyword, setKeyword] = useState("");
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
    <form className="relative" onSubmit={submitHandler}>
      <button
        className="absolute top-2/4 right-[2%] -translate-y-2/4"
        type="submit"
      >
        <i className="fa-light fa-magnifying-glass fa-lg"></i>
      </button>
      <input
        type="search"
        placeholder="Search"
        className="w-full py-3 pl-4 pr-[2.7rem] border rounded  focus:outline outline-2 outline-offset-2 outline-red-600"
        value={keyword}
        onChange={onChange}
      />
    </form>
  );
};

export default Searchbar;
