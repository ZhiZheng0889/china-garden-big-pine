const { expect } = require("chai");
const request = require("supertest");
const app = require("../src/app");
/*
Create rest api for orders to be able to list, 
read one order, 
update order, 
create order, 
delete order
*/

describe("01 - List, Read, Create, update, and Delete orders", () => {
  // beforeAll(() => {
  //   return knex.migrate
  //     .forceFreeMigrationsLock()
  //     .then(() => knex.migrate.rollback(null, true))
  //     .then(() => knex.migrate.latest());
  // });

  // beforeEach(() => {
  //   return knex.seed.run();
  // });

  // afterAll(async () => {
  //   return await knex.migrate.rollback(null, true).then(() => knex.destroy());
  // });

  describe("List orders by user", () => {
    test("Should return 404 error if user _id is not found", () => {});

    test("Should return a list of orders", () => {});
  });

  describe("Read order from order _id ", () => {
    test("Should return 404 error if order _id is not found", () => {});

    test("Should return an order from order_id without phone number, email, or order id", () => {});
  });

  describe("Create order", () => {
    test("Should return 400 error if user _id is not null and not a number", () => {});

    test("Should return 400 error if phone number is not null and a valid phone number", () => {});

    test("Should return 400 error if email is not null and not a valid email", () => {});

    test("Should create order without a user _id", () => {});

    test("Should create order without a phone_number", () => {});

    test("Should create order without a email", () => {});
    describe("Cart", () => {
      test("Should return 400 error if cart does not exist", () => {});

      test("Should return 400 error if cart is not an array", () => {});

      test("Should return 400 error if cart item is not an object", () => {});

      test("Should return 400 error if cart item does not have a food id", () => {});

      test("Should return 400 error if cart item food _id is not null", () => {});

      test("Should return 400 error if cart item food _id is not a number", () => {});

      test("Should return 400 error if cart item does not have a quantity", () => {});

      test("Should return 400 error if cart item quantity is not a number", () => {});

      test("Should return 400 error if cart item specialRequest is not a string", () => {});

      test("Should return 400 error if cart item specialRequest is not at most a certain length", () => {});

      test("Should return 400 error if cart item selectedFoodOption is not a number", () => {});

      test("Should return 400 error if cart item selectedFoodSize is not a number", () => {});

      test("Should return 400 error if cart item does not have a valid property", () => {});

      test("Should return 400 error if cart item does not have all required properties", () => {});

      test("Should create order if specialRequest does not exist", () => {});

      test("Should create order if selectedFoodOption does not exist", () => {});

      test("Should create order if selectedFoodSize does not exist", () => {});
    });
  });

  describe("Delete order", () => {});
});
