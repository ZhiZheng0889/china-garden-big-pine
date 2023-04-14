import React, { useEffect, useState } from "react";
import { listFoods } from "../../../api/foodApi";
import Loading from "../../Loading/Loading";
import Modal from "../../Modal/Modal";
import FoodCard from "../FoodCard/FoodCard";

const FoodList = ({ category, cart, setCart, error, setError, search }) => {
  const [foods, setFoods] = useState([]);
  const [currentFood, setCurrentFood] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // Get food items based on query of food type
  useEffect(() => {
    setError(null);
    setFoods([]);
    // create abort controller to handle cancelling
    // requests on query change
    const abortController = new AbortController();
    const getFoods = async () => {
      try {
        setIsLoading(true);
        if (category) {
          const response = await listFoods(
            { search, category },
            abortController
          );
          setFoods(response);
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    getFoods();
    return () => abortController.abort();
  }, [category, search]);

  // create list of foods
  const foodsList = foods.map((food) => {
    return (
      <FoodCard
        key={food._id}
        food={food}
        setCurrentFood={setCurrentFood}
        setCart={setCart}
        cart={cart}
      />
    );
  });

  // Render loading or food
  return (
    <>
      <div data-testid="foods-list-container">
        {isLoading ? (
          <Loading padding="p-3" />
        ) : foods.length > 0 ? (
          foodsList
        ) : (
          <p className="p-3" data-testid="no-foods-available">
            No Food Available
          </p>
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
