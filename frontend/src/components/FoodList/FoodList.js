import React, { useState, useEffect } from 'react';
import { listFood } from '../../api/FetchFood';
import FoodCard from '../FoodCard/FoodCard';
const FoodList = ({ query, setCart, error, setError }) => {
  const [foods, setFoods] = useState([]);
  useEffect(() => {
    setFoods([]);
    setError(null);
    const abortController = new AbortController();
    (async () => {
      try {
        const response = await listFood(
          query ? { category: query } : {},
          abortController.signal
        );
        console.log(response);
        setFoods(response);
      } catch (error) {
        setError(error);
      }
    })();
    return () => abortController.abort();
  }, [query]);
  const foodsList = foods.map((food, index) => {
    console.log(food);
    return <FoodCard key={food.food_id} food={food} setCart={setCart} />;
  });
  return (
    <div className="p-3">
      {foods.length > 0 ? (
        { foodsList }
      ) : error ? (
        <p>Unable to retrieve food. Please refresh.</p>
      ) : (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
    </div>
  );
};

export default FoodList;
