import React, { useEffect, useState } from 'react';
import { listFoods } from '../../../api/foodApi';
import Loading from '../../Loading/Loading';
import FoodCard from '../FoodCard/FoodCard';

const FoodList = ({ query }) => {
  const [foods, setFoods] = useState([]);
  const [error, setError] = useState(null);
  // Get food items based on query of food type
  useEffect(() => {
    setError(null);
    setFoods([]);
    // create abort controller to handle cancelling
    // requests on query change
    const abortControler = new AbortController();
    const getFoods = async () => {
      try {
        const response = await listFoods(
          { category: query },
          abortControler.signal
        );
        setFoods(response);
      } catch (error) {
        setError(error);
      }
    };
    getFoods();
    return () => abortControler.abort();
  }, [query]);

  // create list of foods
  const foodsList = foods.map((food) => {
    return <FoodCard key={food.food_id} food={food} />;
  });

  // Render loading or food
  return (
    <div className="p-0">
      {error ? null : foods.length > 0 ? foodsList : <Loading padding="p-3" />}
    </div>
  );
};

export default FoodList;
