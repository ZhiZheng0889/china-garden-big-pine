const { expect } = require("chai");
const request = require("supertest");
const mongoose = require("mongoose");

const app = require("../src/app");
const Food = require("../src/models/Food");

describe("00 - List and Query Food From Categories", () => {
  beforeAll(async () => {
    try {
      const uri = DatabaseConfig.getDatabaseUriForTest();
      await mongoose.connect(uri);
    } catch (err) {
      console.error(err);
    }
  });

  beforeEach(async () => {
    try {
      await Food.deleteMany({});
      await seedTest("--foods");
    } catch (err) {
      console.error(err);
    }
  });

  afterAll(async () => {
    await mongoose.connection.close();
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
    test("Should return 200 for foods", async () => {
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
      expect(firstFood.name).to.equal("Steamed Mixed Vegetables");
      expect(firstFood.base_price).to.equal(12.25);
      expect(firstFood.category).to.equal("diet_dishes");
      expect(firstFood.description).to.equal(null);
      expect(firstFood.spicy).to.equal(false);
      expect(firstFood.available).to.equal(true);
    });
  });

  describe("GET /foods", () => {
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
