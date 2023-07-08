import React from "react";
import { formatCost } from "../../../../utils/formatCost";

const FoodModalSizes = ({ sizes, selectedSize, setSelectedSize }) => {
  return (
    Array.isArray(sizes) &&
    sizes.length > 0 && (
      <form>
        <fieldset>
          <legend>
            <h3 className="text-lg font-semibold mb-2">Sizes</h3>
          </legend>
          <div className="border-t">
            {sizes.map((size, index) => {
              return (
                <div
                  key={size.size}
                  className={`flex gap-2 items-center p-3 border-b ${
                    selectedSize === index && "bg-gray-100"
                  }`}
                  onClick={() => setSelectedSize(index)}
                >
                  <input
                    type="radio"
                    data-id={index}
                    name={size.size}
                    className="accent-red-700 focus:outline outline-2 outline-offset-2 outline-red-600"
                    onChange={() => setSelectedSize(index)}
                    checked={selectedSize === index}
                  />
                  <label className="" onClick={() => setSelectedSize(index)}>
                    {size.size}
                  </label>
                  <p className="ml-auto">{"+ $" + formatCost(size.upcharge)}</p>
                </div>
              );
            })}
          </div>
        </fieldset>
      </form>
    )
  );
};

export default FoodModalSizes;
