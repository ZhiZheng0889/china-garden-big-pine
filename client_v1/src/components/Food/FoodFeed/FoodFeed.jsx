import { useEffect, useRef, useState } from "react";
import Food from "../../../api/Food";
import FoodList from "../FoodList/FoodList";
import InfiniteScroll from "react-infinite-scroll-component";

const FoodFeed = ({ error, setError, category, search }) => {
  const [foods, setFoods] = useState([]);
  const [page, setPage] = useState(1);
  const [isEnd, setIsEnd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getFood = async () => {
    try {
      setIsLoading(true);
      setError(null);
      if (search) {
        const response = await Food.getFoodBySearch(search, page);
      } else {
        const response = await Food.getFoodByCategory(category ?? "all", page);
      }
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getFood();
  }, [category, search]);

  console.log(isEnd);

  return (
    <div>
      {error && <p className="p-3">Error: {error.message}</p>}
      {!isEnd && <button>Load More</button>}
    </div>
  );
};

export default FoodFeed;
