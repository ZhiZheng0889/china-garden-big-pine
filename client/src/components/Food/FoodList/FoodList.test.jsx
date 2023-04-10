import { render, screen, waitFor } from "@testing-library/react";
import FoodList from "./FoodList";
import { vi } from "vitest";
const { VITE_BASE_URL } = process.env;

let windowFetchSpy;

function wait(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

const mockFoodResponse = [
  {
    _id: "64189628c744cf0e3f9ebc5e",
    name: "Spring Rolls(2)",
    basePrice: 4.75,
    category: "appetizers",
    description: null,
    spicy: false,
    available: true,
    options: [],
    sizes: [],
    createdAt: "2023-03-20T17:21:44.947Z",
    updatedAt: "2023-03-20T17:21:44.947Z",
    __v: 0,
  },
  {
    _id: "64189628c744cf0e3f9ebc60",
    name: "Egg Rolls(2)",
    basePrice: 4.75,
    category: "appetizers",
    description: null,
    spicy: false,
    available: true,
    options: [],
    sizes: [],
    createdAt: "2023-03-20T17:21:44.947Z",
    updatedAt: "2023-03-20T17:21:44.947Z",
    __v: 0,
  },
  {
    _id: "64189628c744cf0e3f9ebc61",
    name: "Shrimp Toast",
    basePrice: 5.75,
    category: "appetizers",
    description: null,
    spicy: false,
    available: true,
    options: [],
    sizes: [],
    createdAt: "2023-03-20T17:21:44.947Z",
    updatedAt: "2023-03-20T17:21:44.947Z",
    __v: 0,
  },
];

let mockFetch = async (url) => {
  console.log("FEURL: ", VITE_BASE_URL);
  console.log("URL", url);
  await wait(70);
  return mockFoodResponse;
};

const obj = {
  listFoods: () => mockFoodResponse,
};

describe("FoodList", () => {
  beforeEach(() => {
    windowFetchSpy = vi.spyOn(obj, "listFoods").mockImplementation(mockFetch);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

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
    await waitFor(
      () => {
        expect(screen.getByText("Spring Rolls(2)")).toBeInTheDocument();
      },
      { timeout: 4000 }
    );

    expect(screen.getByText("Spring Rolls(2)")).toBeInTheDocument();
    expect(screen.getByText("Egg Rolls(2)")).toBeInTheDocument();
    expect(screen.getByText("Shrimp Toast")).toBeInTheDocument();
  });
});
