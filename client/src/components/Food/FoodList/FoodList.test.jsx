import { render, screen } from "@testing-library/react";
import FoodList from "./FoodList";

describe("FoodList", () => {
  it("Should work properly when cart and setCart is ", () => {});
  it("Should return a list of food by default", async () => {
    const defaultCategory = "appetizers";
    render(
      <FoodList
        category={defaultCategory}
        cart={[]}
        setCart={() => {}}
        error={null}
        setError={() => {}}
        search=""
      />
    );
    const foodCard = screen.getByTestId("food-card");
    const errorAlert = screen.getByTestId("error-alert");
    expect(foodCard).toBeDefiend();
    expect(errorAlert).toBeUndefined();
  });

  it("Should return No available foods when a category doesn't exist", () => {});
});
