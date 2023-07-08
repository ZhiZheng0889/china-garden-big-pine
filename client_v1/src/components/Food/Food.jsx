import React, { useState } from "react";
import { useSelector } from "react-redux";
import Card from "../Card/Card";
import FoodHeader from "./FoodHeader/FoodHeader";
import FoodFeed from "./FoodFeed/FoodFeed";
import ErrorAlert from "../../errors/ErrorAlert";
import FoodModal from "./FoodModal/FoodModal";
import { useDisableBodyScroll } from "../../hooks/useDisableBodyScroll";
import { unselectFood } from "../../slices/selectedFoodSlice";

const Food = ({ search }) => {
  const [error, setError] = useState(null);

  const { selectedFood } = useSelector((state) => state.selectedFood);
  useDisableBodyScroll(selectedFood ? JSON.stringify(selectedFood) : null);
  return (
    <>
      <FoodModal selectedFood={selectedFood} unselectFood={unselectFood} />
      <Card padding="p-0">
        {error && <ErrorAlert error={error} className="m-3" />}
        <FoodHeader />
        <FoodFeed error={error} setError={setError} search={search} />
      </Card>
      <FoodModal selectedFood={selectedFood} />
    </>
  );
};

export default Food;
