import React, { useEffect, useState } from 'react';
import { listFoods } from '../../../api/foodApi';
import Loading from '../../Loading/Loading';
import Modal from '../../Modal/Modal';
import FoodCard from '../FoodCard/FoodCard';

const FoodList = ({ query, cart, setCart, error, setError }) => {
  const [foods, setFoods] = useState([]);
  const [currentFood, setCurrentFood] = useState(null);
  // Get food items based on query of food type
  useEffect(() => {
    setError(null);
    setFoods([]);
    // create abort controller to handle cancelling
    // requests on query change
    const abortControler = new AbortController();
    const getFoods = async () => {
      try {
        const response = await listFoods(query, abortControler.signal);
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
    return (
      <FoodCard
        key={food.food_id}
        food={food}
        setCurrentFood={setCurrentFood}
      />
    );
  });

  // Render loading or food
  return (
    <>
      <div>
        {error ? null : foods.length > 0 ? (
          foodsList
        ) : (
          <Loading padding="p-3" />
        )}
      </div>
      {currentFood && (
        <Modal
          food={currentFood}
          cart={cart}
          setCart={setCart}
          setFood={setCurrentFood}
        />
      )}
    </>
  );
};

export default FoodList;
