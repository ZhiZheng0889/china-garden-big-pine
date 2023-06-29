import { describe, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import FoodHeader from "./FoodHeader";

describe("FoodHeader", () => {
  it("Should display the companies name in the header", () => {
    render(<FoodHeader />);

    expect(screen.getByText(/China Garden/i)).toBeDefined();
  });

  it("Should display the companies address in the header", () => {
    render(<FoodHeader />);

    expect(screen.getByText(/209 Key Deer Blvd, Big Pine Key/i)).toBeDefined();
  });
});
