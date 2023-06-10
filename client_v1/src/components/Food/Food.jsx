import React, { useState } from "react";
import Card from "../Card/Card";
import FoodHeader from "./FoodHeader/FoodHeader";
import FoodFeed from "./FoodFeed/FoodFeed";
import ErrorAlert from "../../errors/ErrorAlert";

const Food = ({ search, category }) => {
  const [error, setError] = useState(null);
  return (
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
  );
};

export default Food;
