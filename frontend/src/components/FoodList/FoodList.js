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

        setFoods(response);
      } catch (error) {
        setError(error);
      }
    })();
    return () => abortController.abort();
  }, [query]);

  return (
    <div className="p-3">
      {Array.isArray(foods) && foods.length > 0 ? (
        foods.map((food, index) => {
          return <FoodCard key={food.food_id} food={food} setCart={setCart} />;
        })
      ) : error ? (
        <p>Unable to retrieve food. Please refresh.</p>
      ) : (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodList;
