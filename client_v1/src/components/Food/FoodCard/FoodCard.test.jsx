import { describe, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import FoodCard from "./FoodCard";

describe("FoodCard", () => {
  it("Should Create a food card with the food name in the header", () => {
    // const foodItem = {
    //   _id: "649a406a733196e9d88a1dce",
    //   name: "Steamed Dumplings",
    //   basePrice: 8.75,
    //   category: "appetizers",
    //   description: null,
    //   spicy: false,
    //   available: true,
    //   imageUrl: "",
    //   options: [],
    //   sizes: [],
    //   createdAt: "2023-06-27T01:50:34.367Z",
    //   updatedAt: "2023-06-27T01:50:34.367Z",
    // };
    // render(<FoodCard food={foodItem} />);
    // const headerText = screen.getByTestId("food-card-header").textContent;
    // expect(headerText).toStrictEqual(foodItem.name);
  });
});
