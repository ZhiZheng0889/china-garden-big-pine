import React, { useEffect } from "react";
import { toTitleCase } from "../../../utils/toTitleCase";
import Card from "../../Card/Card";

const SideNav = ({ className, category, setCategory, setIsBurgerOpen }) => {
  useEffect(() => {
    setCategory("appetizers");
  }, []);
  const changeCategory = ({ target }) => {
    const { id } = target;
    setCategory(id);
    setIsBurgerOpen(false);
  };
  const categories = [
    "appetizers",
    "soup",
    "drinks",
    "side_orders",
    "fried_rice",
    "diet_dishes",
    "lo_mein_or_chow_mei_fun",
    "chicken",
    "pork",
    "beef",
    "chow_mein",
    "chop_suey",
    "egg_foo_young",
    "sweet_and_sour",
    "seafood",
    "chef_special",
    "combo",
    "lunch",
  ];
  return (
    <ul className="overflow-hidden">
      {categories.map((cat) => {
        return (
          <li key={cat} onClick={changeCategory} id={cat}>
            <button
              className={`py-3 px-5 hover:text-red-700 hover:underline hover:bg-slate-50 w-full text-start focus:outline outline-2 outline-offset-2 outline-red-600 ${
                category === cat && "text-red-700 underline bg-slate-50"
              }`}
              onClick={changeCategory}
              id={cat}
            >
              {toTitleCase(cat)}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

SideNav.defaultProps = {
  className: "",
};

export default SideNav;
