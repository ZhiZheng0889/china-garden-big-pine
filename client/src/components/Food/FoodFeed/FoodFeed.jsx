import React from "react";
import { useState } from "react";

const FoodFeed = ({ error, setError }) => {
  const [foods, setFoods] = useState([]);
  const [loadingFood, setLoadingFood] = useState(false);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  useEffect(() => {
    if (search) {
    }
  }, [search]);

  useEffect(() => {
    if (category) {
    }
  }, [category]);
  return (
    <div>
      {loadingFood ? (
        <p className="p-3">Loading...</p>
      ) : (
        <p className="p-3 font-semibold">No Foods Available</p>
      )}
    </div>
  );
};

export default FoodFeed;
