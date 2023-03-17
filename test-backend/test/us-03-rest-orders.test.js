const { expect } = require("chai");
const request = require("supertest");
const app = require("../src/app");
const knex = require("../src/db/connection");
/*
Create rest api for orders to be able to list, 
read one order, 
update order, 
create order, 
delete order
*/

describe("01 - List, Read, Create, update, and Delete orders", () => {
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

  describe("Test creating order on route /orders", () => {
    test("Should return a status of 400 for a property that is not allowed", async () => {
      const data = {
        cart: [
          {
            food_id: 1,
            quantity: 1,
          },
          { food_id: 2, quantity: 2, specialRequest: "Test request" },
        ],
      };
    });
    describe("Test cart on creating order", () => {
      test("Should return a status of 400 for if cart is empty", async () => {});

      test("Should return a status of 404 for any food ids passed in cart not found in db", async () => {});

      test("Should return 404 if food option ids in cart is not found in db", async () => {});

      test("Should return 404 status code if food size ids not found in db", async () => {});

      test("Should return 400 if food size ids do not match food id on cart", async () => {});

      test("Should return 400 if food option ids do not match food id on cart", async () => {});

      test("Should return  ");
    });
  });
});
