import React from "react";
import { formatCost } from "../../../../utils/formatCost";
const FoodModalOptions = ({ options, selectedOption, setSelectedOption }) => {
  return (
    Array.isArray(options) &&
    options.length > 0 && (
      <form>
        <fieldset>
          <legend>
            <h3 className="text-lg font-semibold mb-2">options</h3>
          </legend>
          <div className="border-t">
            {options.map((option, index) => {
              return (
                <div
                  key={option.option}
                  className={`flex gap-2 items-center p-3 border-b ${
                    selectedOption === index && "bg-gray-100"
                  }`}
                  onClick={() => setSelectedOption(index)}
                >
                  <input
                    type="radio"
                    data-id={index}
                    name={option.option}
                    className="accent-red-700 focus:outline outline-2 outline-offset-2 outline-red-600"
                    onChange={() => setSelectedOption(index)}
                    checked={selectedOption === index}
                  />
                  <label className="" onClick={() => setSelectedOption(index)}>
                    {option.option}
                  </label>
                  <p className="ml-auto">
                    {"+ $" + formatCost(option.upcharge)}
                  </p>
                </div>
              );
            })}
          </div>
        </fieldset>
      </form>
    )
  );
};

export default FoodModalOptions;
