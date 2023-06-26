import React from "react";

const FoodModalSpecialRequest = ({ specialRequest, setSpecialRequest }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold">Special Request</h3>
      <form>
        <p className="text-sm">
          **NOTE EXTRA CHARGES MAY BE INCURRED FOR ADDITIONS IN THIS SECTION.
          PLEASE INCLUDE THE AMOUNT BY $ FOR ADDING MORE INGREDIENT TO A DISH.**
        </p>
        <textarea className="w-full border rounded focus:outline outline-2 outline-offset-2 outline-red-600"></textarea>
      </form>
    </div>
  );
};

export default FoodModalSpecialRequest;
