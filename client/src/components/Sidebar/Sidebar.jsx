import React, { useEffect } from "react";
import Card from "../Card/Card";
import styles from "./Sidebar.module.css";
const Sidebar = ({ query, setQuery }) => {
  useEffect(() => {
    setQuery("appetizers");
  }, []);

  const categories = [
    "appetizers",
    "drinks",
    "side_orders",
    "fried_rice",
    "chicken",
    "pork",
    "beef",
    "seafood",
    "soup",
    "lo_mein",
    "chow_mein",
    "egg_foo_young",
    "sweet_and_sour",
    "chop_suey",
    "diet_dishes",
    "special_combinations",
  ];
  const handleClick = ({ target }) => {
    const { id } = target;
    setQuery(id);
  };
  const categoriesList = categories.map((item, index) => {
    const text = item.split("_").join(" ");
    return (
      <li
        id={item}
        key={item + index}
        onClick={handleClick}
        className={`${item === query ? styles.active : ""} ${styles.listItem}`}
      >
        {text}
      </li>
    );
  });
  return (
    <Card padding="p-0">
      <ul className={styles.nav}>{categoriesList}</ul>
    </Card>
  );
};

export default Sidebar;
