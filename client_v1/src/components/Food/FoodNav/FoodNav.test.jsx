import { describe, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import FoodNav from "./FoodNav";

describe("FoodNav", () => {
  it("Should create an ul with li", () => {
    const categories = [
      "Appetizers",
      "Soup",
      "Drinks",
      "Side Orders",
      "Fried Rice",
      "Diet Dishes",
      "Lo Mein or Chow Mei Fun",
      "Chicken",
      "Pork",
      "Beef",
      "Chow Mein",
      "Chop Suey",
      "Egg Foo Young",
      "Sweet and Sour",
      "Seafood",
      "Chef Special",
      "Combo",
      "Lunch",
    ];
    render(<FoodNav categories={categories} />);
    const ulLength = screen.getByTestId("food-nav").children.length;
    expect(ulLength).toStrictEqual(categories.length);
  });

  it("Should create an ul with no li if categories is empty", () => {
    const categories = [];
    render(<FoodNav categories={categories} />);
    const ulLength = screen.getByTestId("food-nav").children.length;
    expect(ulLength).toStrictEqual(categories.length);
  });
});
