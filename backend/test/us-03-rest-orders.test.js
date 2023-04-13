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
  describe("List orders by user", () => {
    test("Should return 404 error if user _id is not found", () => {});

    test("Should return a list of orders", () => {});
  });

  describe("Read order from order _id ", () => {
    test("Should return 404 error if order _id is not found", () => {});

    test("Should return an order from order_id without phone number, email, or user id", () => {});
  });

  describe("Create order", () => {
    test("Should return 400 error if phone number is not defined", async () => {
      const data = {};
      const response = await request(app)
        .post("/orders")
        .set("Accept", "application/json")
        .send({ data });
      expect(response.status).to.equal(400);
      expect(response.body.error).to.contain("phoneNumber");
    });

    test("Should return 400 error if phone number is not a valid phone number", async () => {
      const data = {};
      const response = await request(app)
        .post("/orders")
        .set("Accept", "application/json")
        .send({ data });

      expect(response.status).to.equal(400);
      expect(response.body.error).to.contain("phoneNumber");
    });

    test("Should return 400 error if email is not null and not a valid email", async () => {});

    test("Should create order without a user _id", async () => {});

    test("Should create order without a email", async () => {});
    describe("Cart", () => {
      test("Should return 400 error if cart does not exist", async () => {});

      test("Should return 400 error if cart is not an array", async () => {});

      test("Should return 400 error if cart item is not an object", async () => {});

      test("Should return 400 error if cart item does not have a food id", async () => {});

      test("Should return 400 error if cart item food _id is not null", async () => {});

      test("Should return 400 error if cart item food _id is not a number", async () => {});

      test("Should return 400 error if cart item does not have a quantity", async () => {});

      test("Should return 400 error if cart item quantity is not a number", async () => {});

      test("Should return 400 error if cart item specialRequest is not a string", async () => {});

      test("Should return 400 error if cart item specialRequest is not at most a certain length", async () => {});

      test("Should return 400 error if cart item selectedFoodOption is not a number", async () => {});

      test("Should return 400 error if cart item selectedFoodSize is not a number", async () => {});

      test("Should return 400 error if cart item does not have a valid property", async () => {});

      test("Should return 400 error if cart item does not have all required properties", async () => {});

      test("Should create order if specialRequest does not exist", async () => {});

      test("Should create order if selectedFoodOption does not exist", async () => {});

      test("Should create order if selectedFoodSize does not exist", async () => {});
    });
  });

  describe("Delete order", () => {});
});
