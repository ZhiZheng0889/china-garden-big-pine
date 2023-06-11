import React, { useState } from "react";

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
  return (
    <>
      <article
        className={`food-item p-0 h-[50rem] overflow-y-hidden flex justify-between`}
        data-testid="food-card"
      >
        <div className="details pl-3 pt-3 pb-3">
          <div>
            <h5>
              {name}
              {amount && (
                <span className=" ms-2 text-muted text-thin">({amount})</span>
              )}
            </h5>
            {spicy && <p>🌶</p>}
          </div>

          {description && (
            <p className={`hidden md:block pr-2`}>{description}</p>
          )}
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
              alt={`${name} image`}
            />
          </div>
        </div>
      </article>
    </>
  );
};

export default FoodCard;
