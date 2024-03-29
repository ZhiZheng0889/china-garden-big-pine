const { PAGE_SIZE } = process.env;
const request = require("supertest");
const app = require("../src/app");
const DatabaseManger = require("../src/db/DatabaseManager");
const DatabaseConfig = require("../src/db/DatabaseConfig");
const Food = require("../src/db/models/foodModel");
require("dotenv").config();

const foodData = [
  {
    name: "Steamed Mixed Vegetables",
    basePrice: 12.25,
    category: "diet_dishes",
    description: null,
    spicy: false,
    available: true,
  },
  {
    name: "Spring Rolls(2)",
    basePrice: 4.75,
    category: "appetizers",
    description: null,
    spicy: false,
    available: true,
  },
  {
    name: "Vegetable Spring Rolls(2)",
    basePrice: 4.75,
    category: "appetizers",
    description: null,
    spicy: false,
    available: true,
  },
  {
    name: "Beef with Garlic Sauce",
    basePrice: 14.95,
    category: "beef",
    description: "With White Rice",
    spicy: true,
    available: true,
    imageUrl: "https://imgur.com/8ebSQeR.jpg",
  },
];

beforeAll(async () => {
  await DatabaseManger.connect(DatabaseConfig.getDatabaseUri("test"));
  await DatabaseManger.reap(Food);
  await DatabaseManger.seed(Food, foodData);
});

afterAll(async () => {
  await DatabaseManger.reap(Food);
  await DatabaseManger.disconnect();
});

describe("Pagination", () => {
  test("Should return an object with results containing the food", async () => {
    const response = await request(app)
      .get("/foods?category=all")
      .set("Accept", "application.json");

    console.log(response.body);

    expect(response.body.results).toBeDefined();
    expect(response.body.results.length).toBeGreaterThan(0);
  });

  test("Should return an object with page as the page number", async () => {
    const response = await request(app)
      .get("/foods?category=all")
      .set("Accept", "application.json");

    expect(response.body.page).toBeDefined();
    expect(response.body.page).toBe(1);
  });

  test("Should return the first page if the page number isn't provided", async () => {
    const response = await request(app)
      .get("/foods?category=all")
      .set("Accept", "application.json");

    expect(response.body.page).toBeDefined();
    expect(response.body.page).toBe(1);
  });
});

describe("List", () => {
  test("Should return foods with all category", async () => {
    const response = await request(app)
      .get("/foods?category=all")
      .set("Accept", "application.json");

    expect(response.body.results).toBeDefined();
    expect(response.body.results.length).toBeGreaterThan(0);
  });

  test("Should return foods with no category", async () => {
    const response = await request(app)
      .get("/foods")
      .set("Accept", "application.json");

    expect(response.body.results).toBeDefined();
    expect(response.body.results.length).toBeGreaterThan(0);
  });

  test("Should return all the appetizers with the appetizers category", async () => {
    const response = await request(app)
      .get("/foods?category=appetizers")
      .set("Accept", "application.json");

    expect(response.body.results).toBeDefined();
    const invalidCategories = response.body.results.filter(
      (food) => food.category !== "appetizers"
    );
    expect(invalidCategories.length).toBe(0);
  });
});

describe("Search", () => {
  test("Should return food that has the query in the name", async () => {
    const data = {
      search: "Spring",
    };
    const response = await request(app)
      .post("/foods/search")
      .set("Accept", "application.json")
      .send({ data });

    expect(response.body.results).toBeDefined();
    expect(response.body.results.length).toEqual(2);
    const invalidFoods = response.body.results.filter((food) => {
      return !food.toLowerCase().includes(search.toLowerCase());
    });
    expect(invalidFoods.length).toEqual(0);
  });

  test("Should return food and be case insensitive", async () => {});

  test("Should return food and trim the query of spaces on the end", async () => {});

  test("Should return food that uses the query in the category", async () => {});
});
