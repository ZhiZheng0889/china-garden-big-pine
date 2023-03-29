import { waitFor, render, screen } from "@testing-library/react";
import FoodList from "./FoodList";
import jest from 'jest';

const { FRONT_END_URL } = process.env;
let windowFetchSpy;

function wait(milliseconds) {
  return new Promise(resolve => {
    setTimeout(resolve, milliseconds);
  })
}

const mockFoodResponse = [
    {
        "_id": "64189628c744cf0e3f9ebc5e",
        "name": "Spring Rolls(2)",
        "basePrice": 4.75,
        "category": "appetizers",
        "description": null,
        "spicy": false,
        "available": true,
        "options": [],
        "sizes": [],
        "createdAt": "2023-03-20T17:21:44.947Z",
        "updatedAt": "2023-03-20T17:21:44.947Z",
        "__v": 0
    },
    {
        "_id": "64189628c744cf0e3f9ebc60",
        "name": "Egg Rolls(2)",
        "basePrice": 4.75,
        "category": "appetizers",
        "description": null,
        "spicy": false,
        "available": true,
        "options": [],
        "sizes": [],
        "createdAt": "2023-03-20T17:21:44.947Z",
        "updatedAt": "2023-03-20T17:21:44.947Z",
        "__v": 0
    },
    {
        "_id": "64189628c744cf0e3f9ebc61",
        "name": "Shrimp Toast",
        "basePrice": 5.75,
        "category": "appetizers",
        "description": null,
        "spicy": false,
        "available": true,
        "options": [],
        "sizes": [],
        "createdAt": "2023-03-20T17:21:44.947Z",
        "updatedAt": "2023-03-20T17:21:44.947Z",
        "__v": 0
    }
];

let mockFetch = async (url) => {
  if (url.startsWith(FRONT_END_URL) && url.includes('appetizers')) {
    await wait(70);
    return {
      ok: true,
      status: 200,
      json: async () => mockHnResponse,
    };
  }
}

describe("FoodList", () => {

  beforeEach(() => {
    windowFetchSpy = jest.spyOn(window, 'fetch').mockImplementation(mockFetch);
  });
  
  afterEach(() => {
    jest.restoreAllMocks();
  });
  
  
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

    const eggRollsHeader = await screen.getByText('Egg Rolls(2)');
    expect()
  });

  it("Should return No available foods when a category doesn't exist", () => {});
});
