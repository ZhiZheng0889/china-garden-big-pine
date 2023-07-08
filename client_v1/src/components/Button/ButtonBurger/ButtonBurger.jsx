import React from "react";

const ButtonBurger = ({ setIsMenuOpen }) => {
  return (
    <button
      onClick={() => setIsMenuOpen((curr) => !curr)}
      className="md:hidden w-8 h-8 rounded hover:bg-red-600 active:bg-red-500 duration-200 ease-out focus:outline outline-2 outline-offset-2 outline-white"
    >
      <i className="fa-solid fa-bars"></i>
    </button>
  );
};

export default ButtonBurger;
