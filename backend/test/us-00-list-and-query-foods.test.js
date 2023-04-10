const { expect } = require("chai");
const request = require("supertest");
const mongoose = require("mongoose");

const app = require("../src/app");
const Food = require("../src/db/models/foodModel");

describe("00 - List and Query Food From Categories", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.DATABASE_URL_DEVELOPMENT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
  });

  beforeEach(async () => {
    await Food.insertMany([
      {
        name: "Steamed Mixed Vegetables",
        base_price: 12.25,
        category: "diet_dishes",
        spicy: false,
        available: true,
      },
      {
        name: "Pork Fried Rice",
        base_price: 7.5,
        category: "rice_and_noodles",
        spicy: false,
        available: true,
      },
      {
        name: "Orange Chicken",
        base_price: 9.5,
        category: "chicken",
        spicy: true,
        available: true,
      },
      {
        name: "Kung Pao Shrimp",
        base_price: 11.25,
        category: "seafood",
        spicy: true,
        available: true,
      },
      {
        name: "Sizzling Beef and Scallops",
        base_price: 17.5,
        category: "beef",
        spicy: false,
        available: false,
      },
    ]);
  });

  afterEach(async () => {
    await Food.deleteMany();
  });

  afterAll(async () => {
    await mongoose.disconnect();
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
     
      describe("00 - Update Food Prices", () => {
        beforeAll(() => {
          return knex.migrate
            .forceFreeMigrationsLock()
            .then(() => knex.migrate.rollback(null, true))
            .then(() => knex.migrate.latest());
        });
      
        beforeEach(() => {
          return knex.seed.run();
        });
      
        afterAll(async () => {
          return await knex.migrate.rollback(null, true).then(() => knex.destroy());
        });
      
        describe("PUT /foods/:food_id", () => {
          test("Should return 404 if food_id is not found", async () => {
            const response = await request(app)
              .put("/foods/100")
              .set("Accept", "application/json")
              .send({
                data: {
                  price: 10.0,
                },
              });
            expect(response.status).to.equal(404);
            expect(response.body.error).to.equal("Food id: 100 not found.");
          });
      
          test("Should return updated food", async () => {
            const food = await request(app)
              .get("/foods")
              .query({ category: "appetizers" })
              .set("Accept", "application/json")
              .then((response) => response.body.data[0]);
      
            const response = await request(app)
              .put(`/foods/${food._id}`)
              .set("Accept", "application/json")
              .send({
                data: {
                  price: 15.0,
                },
              });
      
            expect(response.status).to.equal(200);
            expect(response.body.data.price).to.equal(15.0);
          });
        });
      
        describe("PUT /foods/:food_id/options/:option_id", () => {
          test("Should return 404 if food_id is not found", async () => {
            const response = await request(app)
              .put("/foods/100/options/1")
              .set("Accept", "application/json")
              .send({
                data: {
                  price: 10.0,
                },
              });
            expect(response.status).to.equal(404);
            expect(response.body.error).to.equal("Food id: 100 not found.");
          });
      
          test("Should return updated food option", async () => {
            const food = await request(app)
              .get("/foods")
              .query({ category: "appetizers" })
              .set("Accept", "application/json")
              .then((response) => response.body.data[0]);
      
            const option = food.options[0];
      
            const response = await request(app)
              .put(`/foods/${food._id}/options/${option._id}`)
              .set("Accept", "application/json")
              .send({
                data: {
                  price: 15.0,
                },
              });
      
            expect(response.status).to.equal(200);
            expect(response.body.data.options[0].price).to.equal(15.0);
          });
        });
      
        describe("PUT /foods/:food_id/sizes/:size_id", () => {
          test("Should return 404 if food_id is not found", async () => {
            const response = await request(app)
              .put("/foods/100/sizes/1")
              .set("Accept", "application/json")
              .send({
                data: {
                  price: 10.0,
                },
              });
            expect(response.status).to.equal(404);
            expect(response.body.error).to.equal("Food id: 100 not found.");
          });
      
          test("Should return updated food size", async () => {
            const food = await request(app)
              .get("/foods")
              .query({ category : "appetizers" })
              .set("Accept", "application/json")
              .then((response) => response.body.data[0]);

            const size = food.sizes[0];

            const response = await request(app)
              .put(`/foods/${food._id}/sizes/${size._id}`)
              .set("Accept", "application/json")
              .send({
                data: {
                  price: 15.0,
                },
              });
              
            expect(response.status).to.equal(200);
            expect(response.body.data.sizes[0].price).to.equal(15.0);
          });
        });

        describe("PUT /foods/:food_id", () => {
          test("Should update the price of the food", async () => {
            const food = await request(app)
              .get("/foods")
              .query({ category: "appetizers" })
              .set("Accept", "application/json")
              .then((response) => response.body.data[0]);
            const newPrice = food.base_price + 1;
            const response = await request(app)
              .put(`/foods/${food._id}`)
              .send({ data: { price: newPrice } })
              .set("Accept", "application/json");
            const updatedFood = response.body.data;
            expect(updatedFood.price).to.equal(newPrice);
          });
        });
      
        describe("PUT /foods/:food_id/options/:option_id", () => {
          test("Should update the price of the food option", async () => {
            const food = await request(app)
              .get("/foods")
              .query({ category: "appetizers" })
              .set("Accept", "application/json")
              .then((response) => response.body.data[0]);
            const option = food.options[0];
            const newPrice = option.price + 1;
            const response = await request(app)
              .put(`/foods/${food._id}/options/${option._id}`)
              .send({ data: { price: newPrice } })
              .set("Accept", "application/json");
            const updatedOption = response.body.data;
            expect(updatedOption.price).to.equal(newPrice);
          });
        });
      
        describe("PUT /foods/:food_id/sizes/:size_id", () => {
          test("Should update the price of the food size", async () => {
            const food = await request(app)
              .get("/foods")
              .query({ category: "appetizers" })
              .set("Accept", "application/json")
              .then((response) => response.body.data[0]);
            const size = food.sizes[0];
            const newPrice = size.price + 1;
            const response = await request(app)
              .put(`/foods/${food._id}/sizes/${size._id}`)
              .send({ data: { price: newPrice } })
              .set("Accept", "application/json");
            const updatedSize = response.body.data;
            expect(updatedSize.price).to.equal(newPrice);
          });
        });
      
        describe("PUT /foods/:food_id/amounts/:amount_id", () => {
          test("Should update the price of the food amount", async () => {
            const food = await request(app)
              .get("/foods")
              .query({ category: "appetizers" })
              .set("Accept", "application/json")
              .then((response) => response.body.data[0]);
            const amount = food.amounts[0];
            const newPrice = amount.price + 1;
            const response = await request(app)
              .put(`/foods/${food._id}/amounts/${amount._id}`)
              .send({ data: { price: newPrice } })
              .set("Accept", "application/json");
            const updatedAmount = response.body.data;
            expect(updatedAmount.price).to.equal(newPrice);
          });
        });
      });
      
      describe("PUT /foods/:food_id", () => {
        test("Should update the price of the food", async () => {
          const food = await request(app)
            .get("/foods")
            .query({ category: "appetizers" })
            .set("Accept", "application/json")
            .then((response) => response.body.data[0]);
          const newPrice = food.base_price + 1;
          const response = await request(app)
            .put(`/foods/${food._id}`)
            .send({ data: { price: newPrice } })
            .set("Accept", "application/json");
          const updatedFood = response.body.data;
          expect(updatedFood.price).to.equal(newPrice);
        });
      });
    
      describe("PUT /foods/:food_id/options/:option_id", () => {
        test("Should update the price of the food option", async () => {
          const food = await request(app)
            .get("/foods")
            .query({ category: "appetizers" })
            .set("Accept", "application/json")
            .then((response) => response.body.data[0]);
          const option = food.options[0];
          const newPrice = option.price + 1;
          const response = await request(app)
            .put(`/foods/${food._id}/options/${option._id}`)
            .send({ data: { price: newPrice } })
            .set("Accept", "application/json");
          const updatedOption = response.body.data;
          expect(updatedOption.price).to.equal(newPrice);
        });
      });
    
      describe("PUT /foods/:food_id/sizes/:size_id", () => {
        test("Should update the price of the food size", async () => {
          const food = await request(app)
            .get("/foods")
            .query({ category: "appetizers" })
            .set("Accept", "application/json")
            .then((response) => response.body.data[0]);
          const size = food.sizes[0];
          const newPrice = size.price + 1;
          const response = await request(app)
            .put(`/foods/${food._id}/sizes/${size._id}`)
            .send({ data: { price: newPrice } })
            .set("Accept", "application/json");
          const updatedSize = response.body.data;
          expect(updatedSize.price).to.equal(newPrice);
        });
      });
    
      describe("PUT /foods/:food_id/amounts/:amount_id", () => {
        test("Should update the price of the food amount", async () => {
          const food = await request(app)
            .get("/foods")
            .query({ category: "appetizers" })
            .set("Accept", "application/json")
            .then((response) => response.body.data[0]);
          const amount = food.amounts[0];
          const newPrice = amount.price + 1;
          const response = await request(app)
            .put(`/foods/${food._id}/amounts/${amount._id}`)
            .send({ data: { price: newPrice } })
            .set("Accept", "application/json");
          const updatedAmount = response.body.data;
          expect(updatedAmount.price).to.equal(newPrice);
        });
      });
    });


  });
});