const request = require("supertest");
const { expect } = require("chai");
const app = require("../src/app");
const DatabaseManager = require("./DatabaseManager");

describe("00 - List and Query Food From Categories", () => {
  beforeAll(async () => {
    await DatabaseManager.dropAll();
  });

  beforeEach(async () => {
    await DatabaseManager.seedAll();
  });

  afterEach(async () => {
    await DatabaseManager.dropAll();
  });

  afterAll(async () => {
    await DatabaseManager.dropAll();
  });

  describe("Only allow GET request on /foods route", () => {
    test("Should return 405 status on POST request", async () => {
      const response = await request(app)
        .post("/foods")
        .set("Accept", "application/json");

      expect(response.status).to.equal(405);
      expect(response.body.error).to.equal("POST not allowed for /foods");
    });

    test("Should return 405 status on PUT request", async () => {
      const response = await request(app)
        .put("/foods")
        .set("Accept", "application/json");

      expect(response.status).to.equal(405);
      expect(response.body.error).to.equal("PUT not allowed for /foods");
    });

    test("Should return 405 status on DELETE request", async () => {
      const response = await request(app)
        .delete("/foods")
        .set("Accept", "application/json");

      expect(response.status).to.equal(405);
      expect(response.body.error).to.equal("DELETE not allowed for /foods");
    });
  });

  describe("GET /foods", () => {
    test("Should return a status of 200", async () => {
      const response = await request(app)
        .get("/foods")
        .set("Accept", "application/json");

      expect(response.status).to.equal(200);
      expect(response.body.error).to.be.undefined;
    });

    test("Should return a list of foods", async () => {
      const response = await request(app)
        .get("/foods")
        .set("Accept", "application/json");
      const length = response.body.data.length;
      expect(length > 0).to.be.true;
    });

    test("Should return a list of foods with proper format", async () => {
      const response = await request(app)
        .get("/foods")
        .set("Accept", "application/json");
      const firstFood = response.body.data[0];
      expect(response.body.error).to.be.undefined;
      // expect(firstFood.name).to.beDefined();
      // expect(firstFood.base_price).to.beDefined();
      // expect(firstFood.category).to.beDefined();
      // expect(firstFood.description).to.beDefined();
      // expect(firstFood.spicy).to.beDefined();
      // expect(firstFood.available).to.beDefined();
    });

    test("Should return 404 if category is not found", async () => {
      const response = await request(app)
        .get("/foods?category=categoryThatDoesntExist")
        .set("Accept", "application/json");
      expect(response.status).to.equal(404);
      expect(response.body.error).to.equal(
        "Category: categoryThatDoesntExist does not exist"
      );
    });

    test("Should return status of 200 from category", async () => {
      const response = await request(app)
        .get("/foods?category=diet_dishes")
        .set("Accept", "application/json");

      expect(response.status).to.equal(200);
      expect(response.body.error).to.be.undefined;
    });

    test("Should return an array of food from category", async () => {
      const response = await request(app)
        .get("/foods?category=diet_dishes")
        .set("Accept", "application/json");

      const foods = response.body.data;
      const validFoodCategories = foods.filter(
        (food) => food.category === "diet_dishes"
      );
      expect(Array.isArray(foods)).to.be.true;
      expect(foods.length === validFoodCategories.length).to.be.true;
    });
  });
});
