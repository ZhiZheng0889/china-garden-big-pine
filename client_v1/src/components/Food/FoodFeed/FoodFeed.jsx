import { useEffect, useState } from "react";
import Food from "../../../api/Food";

const FoodFeed = ({ error, setError, category, search }) => {
  const [foods, setFoods] = useState([]);
  const [isLoadingFood, setIsLoadingFood] = useState(false);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  useEffect(() => {
    (async () => {
      try {
        setIsLoadingFood(true);
        setFoods([]);
        const controller = new AbortController();
        if (category) {
          const foods = await Food.get({ category }, controller);
          setFoods(foods);
        } else if (search) {
        } else {
          throw new Error("No query has been provided");
        }
      } catch (err) {
        setError(err);
      } finally {
        setIsLoadingFood(false);
      }
    })();
  }, [category, search]);

  return (
    <div>
      {isLoadingFood ? (
        <p className="p-3">Loading...</p>
      ) : (
        <p className="p-3 font-semibold">No Foods Available</p>
      )}
    </div>
  );
};

export default FoodFeed;
