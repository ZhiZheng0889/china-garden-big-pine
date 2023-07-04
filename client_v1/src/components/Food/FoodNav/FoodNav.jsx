import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../../../slices/categorySlice";

const FoodNav = ({
  categories = [
    "Appetizers",
    "Soup",
    "Drinks",
    "Side Orders",
    "Fried Rice",
    "Diet Dishes",
    "Lo Mein or Chow Mei Fun",
    "Chicken",
    "Pork",
    "Beef",
    "Chow Mein",
    "Chop Suey",
    "Egg Foo Young",
    "Sweet and Sour",
    "Seafood",
    "Chef Special",
    "Combo",
    "Lunch",
  ],
  setIsOpen = () => {},
}) => {
  const dispatch = useDispatch();
  const { category } = useSelector((state) => state.category);

  const changeCategory = ({ target }) => {
    const category = target.getAttribute("data-category");
    dispatch(setCategory(category));
    setIsOpen(false);
  };

  return (
    <ul data-testid="food-nav">
      {categories.map((cat) => {
        return (
          <li
            key={cat}
            onClick={changeCategory}
            data-category={cat}
            data-testid={cat}
          >
            <button
              className={`py-3 px-5 hover:text-red-700 hover:underline hover:bg-gray-50 w-full text-start focus:outline outline-2 outline-offset-2 outline-red-600 ${
                category === cat && "text-red-700 underline bg-gray-50"
              }`}
              onClick={changeCategory}
              data-category={cat}
            >
              {cat}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default FoodNav;
