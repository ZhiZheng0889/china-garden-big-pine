import { useEffect, useRef, useState } from "react";
import Food from "../../../api/Food";
import FoodList from "../FoodList/FoodList";
import InfiniteScroll from "react-infinite-scroll-component";
import ApiErrorHandler from "../../../errors/ApiErrorHandler";
import { useSelector } from "react-redux";

const FoodFeed = ({ error, setError, search }) => {
  const [foods, setFoods] = useState([]);
  const [page, setPage] = useState(0);
  const [isEnd, setIsEnd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { category } = useSelector((state) => state.category);

  const getFood = async (isStart) => {
    try {
      setIsLoading(true);
      setError(null);
      if (search) {
        const response = await Food.getFoodBySearch(
          search,
          isStart ? 1 : page + 1
        );
        return response.data;
      } else {
        const response = await Food.getFoodByCategory(
          category ?? "all",
          isStart ? 1 : page + 1
        );
        return response.data;
      }
    } catch (error) {
      setError(ApiErrorHandler.handleRequestResponse(error));
    } finally {
      setIsLoading(false);
    }
  };

  const loadMoreFood = async () => {
    try {
      const response = await getFood();
      if (response?.results) {
        setFoods((curr) => [...curr, ...response?.results]);
      }
      setPage((curr) => response?.page ?? curr + 1);
      if (response.page >= response.totalPage) {
        setIsEnd(true);
      }
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        setIsEnd(false);
        const response = await getFood(true);
        setFoods(response ? response?.results : []);
        setPage(response ? response?.page : 1);
        if (response && response.page >= response.totalPage) {
          setIsEnd(true);
        }
      } catch (error) {
        setError(error);
      }
    })();
  }, [category, search]);

  return (
    <div>
      <InfiniteScroll
        dataLength={foods.length ?? 0}
        next={loadMoreFood}
        hasMore={!isEnd || error !== null}
        loader={<p className="p-3 font-semibold">Loading...</p>}
        endMessage={<p className="p-3 font-semibold">No more food available</p>}
      >
        <FoodList foods={foods ?? []} />
      </InfiniteScroll>
    </div>
  );
};

export default FoodFeed;
