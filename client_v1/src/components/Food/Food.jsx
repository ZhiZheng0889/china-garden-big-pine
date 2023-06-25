import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../Card/Card";
import FoodHeader from "./FoodHeader/FoodHeader";
import FoodFeed from "./FoodFeed/FoodFeed";
import ErrorAlert from "../../errors/ErrorAlert";
import FoodModal from "./FoodModal/FoodModal";
import { useDisableBodyScroll } from "../../hooks/useDisableBodyScroll";
import { unselectFood } from "../../slices/selectedFoodSlice";

const Food = ({ search, category }) => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const { selectedFood } = useSelector((state) => state.selectedFood);
  dispatch(unselectFood());

  useDisableBodyScroll(selectedFood ? JSON.stringify(selectedFood) : null);
  return (
    <>
      <FoodModal selectedFood={selectedFood} unselectFood={unselectFood} />
      <Card padding="p-0">
        {error && <ErrorAlert error={error} className="m-3" />}
        <FoodHeader />
        <FoodFeed
          error={error}
          setError={setError}
          category={category}
          search={search}
        />
      </Card>
    </>
  );
};

export default Food;
