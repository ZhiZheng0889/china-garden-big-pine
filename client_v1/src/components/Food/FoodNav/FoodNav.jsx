import React from "react";

const FoodNav = ({
  category,
  setCategory,
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
}) => {
  const changeCategory = ({ target }) => {
    const category = target.getAttribute("data-category");
    setCategory(category);
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
