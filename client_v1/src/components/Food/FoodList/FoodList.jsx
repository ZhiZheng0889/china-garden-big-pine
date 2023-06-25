import React, { useEffect, useState } from "react";
import FoodHeader from "../FoodHeader/FoodHeader";
import Card from "../../Card/Card";
import FoodFeed from "../FoodFeed/FoodFeed";
import FoodCard from "../FoodCard/FoodCard";

const FoodList = ({ foods }) => {
  return (
    <ul>
      {foods.map((food) => {
        return (
          <li key={food._id}>
            <FoodCard food={food} />
          </li>
        );
      })}
    </ul>
  );
};

export default FoodList;
