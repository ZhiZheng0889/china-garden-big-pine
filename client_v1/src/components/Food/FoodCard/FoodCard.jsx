import React from "react";
import { useDispatch } from "react-redux";

import { selectFood } from "../../../slices/selectedFoodSlice";

import ButtonWhitePill from "../../Button/ButtonWhitePill/ButtonWhitePill";
const FoodCard = ({ food }) => {
  const {
    _id,
    name,
    basePrice,
    likes = null,
    dislikes = null,
    spicy,
    description = null,
    amount = null,
    imageUrl = null,
  } = food;
  const dispatch = useDispatch();

  const chooseFood = () => {
    dispatch(selectFood(food));
  };
  return (
    <>
      <article
        className={`food-item p-0 h-32 border-b overflow-y-hidden flex justify-between`}
        data-testid="food-card"
      >
        <div className="details pl-3 pt-3 pb-3">
          <div className="flex flex-col gap-0">
            <div className="flex gap-1 items-center">
              <h5
                className="text-lg font-semibold max-w-[75%] min-[360px]:max-w-[90%] min-[430px]:max-w-[100%]"
                data-testid="food-card-header"
              >
                {name}
                {amount && (
                  <span className=" ml-2 text-muted text-thin">({amount})</span>
                )}
                {spicy && <span className="text-red-800 text-xl">🌶</span>}
              </h5>
            </div>

            {description && (
              <p
                className={`hidden md:block pr-2 text-gray-600  -translate-y-1`}
              >
                {description}
              </p>
            )}
          </div>

          <div>
            <p className="me-2 mb-0">
              ${basePrice && Number(basePrice).toFixed(2)}
            </p>
            <p></p>
          </div>
        </div>
        <div>
          <div className="relative">
            <img
              src={imageUrl}
              className="object-cover w-[14rem] object-center hidden sm:block"
            />
            <ButtonWhitePill
              className="absolute top-3 right-3 w-20"
              onClick={chooseFood}
            >
              <i className="fa-solid fa-plus me-1"></i> Add
            </ButtonWhitePill>
          </div>
        </div>
      </article>
    </>
  );
};

export default FoodCard;
