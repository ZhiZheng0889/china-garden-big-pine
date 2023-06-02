import React, { useEffect, useState } from "react";
import FoodHeader from "../FoodHeader/FoodHeader";
import Card from "../../Card/Card";
import FoodFeed from "../../../../../client/src/components/Food/FoodFeed/FoodFeed";

const FoodList = ({ search, category }) => {
  const [error, setError] = useState(null);

  return (
    <Card padding="p-0">
      <FoodHeader />
      <FoodFeed error={error} setError={setError} />
    </Card>
  );
};

export default FoodList;
