import React, { useState, useEffect } from 'react';
import Card from '../Card/Card';
import FoodCard from '../FoodCard/FoodCard';
const FoodList = ({ query }) => {
  const [foods, setFoods] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    setFoods([]);
    setFoods([
      {
        food_id: 1,
        name: 'Curry Chicken',
        price: 11.25,
        category: 'chicken',
        spicy: true,
        review: 4,
      },
      {
        food_id: 2,
        name: 'Chicken with Broccoli',
        description: 'Chicken and Broccoli served with rice.',
        price: 11.25,
        category: 'chicken',
        spicy: true,
        review: 4.5,
      },
    ]);
    return () => {};
  }, [query]);
  console.log(foods);
  const foodsList =
    (Array.isArray &&
      foods.map((food) => {
        return <FoodCard key={food.id} food={food} />;
      })) ||
    [];
  return (
    <Card>
      <div className="p-3">{foodsList}</div>
    </Card>
  );
};

export default FoodList;
