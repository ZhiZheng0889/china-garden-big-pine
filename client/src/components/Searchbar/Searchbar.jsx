import React, { useEffect, useState } from "react";

const Searchbar = ({ search, setSearch }) => {
  const [keyword, setKeyword] = useState("");
  useEffect(() => {
    if (!search) {
      setKeyword("");
    }
  }, [search]);
  const submitHandler = (e) => {
    e.preventDefault();
    setSearch(keyword);
  };
  const onChange = ({ target }) => {
    setKeyword(target.value);
  };

  const clearInput = () => {
    setKeyword("");
  };

  return (
    <form className="relative" onSubmit={submitHandler}>
      <button
        className="w-10 h-10 hover:bg-neutral-100 active:bg-neutral-200 ease-out duration-200 rounded absolute top-2/4 right-[1%] -translate-y-2/4 focus:outline outline-2 outline-offset-2 outline-red-600  "
        type="submit"
      >
        <i className="fa-solid fa-magnifying-glass fa-lg"></i>
      </button>
      {/* <button
        onClick={clearInput}
        className="w-10 h-10 hover:bg-neutral-100 active:bg-neutral-200 ease-out duration-200 rounded absolute top-2/4 right-[2%] -translate-y-2/4 focus:outline outline-2 outline-offset-2 outline-red-600  "
        type="button"
      >
        <i className="fa-solid fa-times fa-lg"></i>
      </button> */}
      <input
        type="text"
        placeholder="Search"
        className="w-full py-3 pl-4 pr-[4.7rem] border rounded focus:outline outline-2 outline-offset-2 outline-red-600"
        value={keyword}
        onChange={onChange}
      />
    </form>
  );
};

export default Searchbar;
