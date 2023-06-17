import { useEffect, useRef, useState } from "react";
import Food from "../../../api/Food";
import FoodList from "../FoodList/FoodList";
import InfiniteScroll from "react-infinite-scroll-component";

const FoodFeed = ({ error, setError, category, search }) => {
  const [response, setResponse] = useState({});
  const getFood = () => {
    if (search) {
    } else {
    }
  };

  return (
    <div>
      <InfiniteScroll
        dataLength={response.results?.length ?? 0}
        next={getFood}
        hasMore={true}
        loader={<p className="p-3">Loading...</p>}
        endMessage={<p>No more food available</p>}
      >
        <FoodList foods={response?.results ?? []} />
      </InfiniteScroll>
      {error && <p>Error: {error.message}</p>}
    </div>
  );
};

export default FoodFeed;
