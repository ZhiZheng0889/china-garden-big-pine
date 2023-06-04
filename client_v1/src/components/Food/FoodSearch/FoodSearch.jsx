import React, { useEffect, useState } from "react";
import FormInputContainer from "../../Form/FomrInputContainer/FormInputContainer";

const FoodSearch = ({ search, setSearch }) => {
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    if (!search) {
      setKeyword("");
    }
  }, [search]);

  const submitSearch = (event) => {
    event.preventDefault();
    setSearch(keyword);
  };

  const changeKeyword = ({ target: { value } }) => {
    setKeyword(value);
  };

  return (
    <form className="relative" onSubmit={submitSearch}>
      <FormInputContainer
        state={keyword}
        onChange={changeKeyword}
        placeholder="Search"
        className="relative"
        inputClassName="py-3 pl-4 pr-[2.7rem]"
      >
        <button
          className="w-10 h-10 absolute right-[2%] top-1/2 -translate-y-1/2 hover:bg-gray-50 duration-200 ease-out"
          type="submit"
        >
          <i className="fa-solid fa-magnifying-glass fa-lg"></i>
        </button>
      </FormInputContainer>
      {/* <button className="w-10 h-10" type="submit">
        <i className="fa-solid fa-magnifying-glass fa-lg"></i>
      </button>
      <input
        type="text"
        placeholder="Search"
        className="w-full py-3 pl-4 pr-[2.7rem] border"
      /> */}
    </form>
  );
};

export default FoodSearch;