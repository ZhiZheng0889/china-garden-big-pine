const { PAGE_SIZE } = process.env;
const request = require("supertest");
const app = require("../src/app");
const DatabaseManger = require("../src/db/DatabaseManager");
const DatbaseConfig = require("../src/db/DatabaseConfig");
const DatabaseConfig = require("../src/db/DatabaseConfig");
require("dotenv").config();

beforeEach(async () => {
  await DatabaseManger.connect(DatabaseConfig.getDatabaseUri("test"));
});

afterEach(async () => {
  await DatabaseManger.disconnect();
});

describe("Pagination", () => {
  test("Should return an object with results containing the food", async () => {
    const response = await request(app)
      .get("/foods?category=all")
      .set("Accept", "application.json");

    expect(response.results).toBeDefined();
    expect(response.results.length).toBeGreaterThan(0);
  });

  test("Should return an object with page as the page number", async () => {
    const response = await request(app)
      .get("/foods?category=all")
      .set("Accept", "application.json");

    expect(response.page).toBeDefined();
    expect(response.page).toBe(1);
  });

  test("Should return the first page if the page number isn't provided", async () => {
    const response = await request(app)
      .get("/foods?category=all")
      .set("Accept", "application.json");

    expect(response.page).toBeDefined();
    expect(response.page).toBe(1);
  });
});

describe("List", () => {
  test("Should return foods with all category", async () => {
    const response = await request(app)
      .get("/foods?category=all")
      .set("Accept", "application.json");

    expect(response.results).toBeDefined();
    expect(response.results.length).toBeGreaterThan(0);
  });

  test("Should return foods with no category", async () => {
    const response = await request(app)
      .get("/foods")
      .set("Accept", "application.json");

    expect(response.results).toBeDefined();
    expect(response.results.length).toBeGreaterThan(0);
  });

  test("Should return all the appetizers with the appetizers category", async () => {
    const response = await request(app)
      .get("/foods?category=appetizers")
      .set("Accept", "application.json");

    expect(response.results).toBeDefined();
    const invalidCategories = response.results.filter(
      (food) => food.category !== "appetizers"
    );
    expect(invalidCategories.length).toBe(0);
  });
});

describe("Search", () => {});
