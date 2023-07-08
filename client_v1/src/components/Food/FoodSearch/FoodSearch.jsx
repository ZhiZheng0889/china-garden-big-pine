import React, { useEffect, useState } from "react";
import FormInputContainer from "../../Form/FormInputContainer/FormInputContainer";

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
        setState={setKeyword}
        placeholder="Search"
        className="relative"
        inputClassName="py-3 pl-4 pr-[2.7rem]"
      >
        <button
          className="w-10 h-10 absolute right-[2%] top-1/2 -translate-y-1/2 rounded hover:bg-gray-50 duration-200 ease-out  focus:outline outline-2 outline-offset-2 outline-red-600"
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
