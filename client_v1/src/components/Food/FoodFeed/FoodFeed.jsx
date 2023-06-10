import { useEffect, useState } from "react";
import Food from "../../../api/Food";
import FoodList from "../FoodList/FoodList";
import ApiErrorHandler from "../../../errors/ApiErrorHandler";

const FoodFeed = ({ error, setError, category, search }) => {
  const [foods, setFoods] = useState([]);
  const [isLoadingFood, setIsLoadingFood] = useState(false);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [currentQuery, setCurrentQuery] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        setIsLoadingFood(true);
        setFoods([]);
        const controller = new AbortController();
        let foodData;
        let queryToBeSearched;
        if (category) {
          foodData = await Food.get({ category, page }, controller);
          queryToBeSearched = "category";
        } else if (search) {
          foodData = await Food.get({ search, page }, controller);
          queryToBeSearched = "search";
        } else {
          throw new Error("No query has been provided");
        }
        if (foodData?.data) {
          const { food } = foodData.data;
          if (queryToBeSearched === "category") {
            if (currentQuery === "category") {
              setFoods((curr) => {
                return [...curr, ...food];
              });
            } else {
              setFoods(food);
            }
          } else if (queryToBeSearched === "search")
            if (currentQuery === "search") {
              setFoods((curr) => {
                return [...curr, ...food];
              });
            } else {
              setFoods(food);
            }
          if (category) {
            if (currentQuery !== category) {
              setCurrentQuery(category);
            }
          } else if (search) {
            if (currentQuery !== search) {
              setCurrentQuery(search);
            }
          }
        }
      } catch (err) {
        setError(ApiErrorHandler.handleRequestResponse(err));
      } finally {
        setIsLoadingFood(false);
      }
    })();
  }, [category, search]);

  console.log("======>", foods);
  return (
    <div>
      {error ? (
        <p className="p-3 font-semibold">Unable To Load Food</p>
      ) : isLoadingFood ? (
        <p className="p-3">Loading...</p>
      ) : foods.length > 0 ? (
        <FoodList foods={foods} />
      ) : (
        <p className="p-3 font-semibold">No Foods Available</p>
      )}
    </div>
  );
};

export default FoodFeed;
