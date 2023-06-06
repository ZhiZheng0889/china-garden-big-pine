const request = require("supertest");
const { expect } = require("chai");
const app = require("../src/app");
const DatabaseManager = require("./DatabaseManager");

const foods = DatabaseManager.listFoods();

describe("03 - List, Read, Create, Update, and Delete orders", () => {
  beforeAll(async () => {
    await DatabaseManager.dropAll();
  });

  beforeEach(async () => {
    await DatabaseManager.seedAll();
  });

  afterEach(async () => {
    await DatabaseManager.dropAll();
  });

  describe("List orders by user", () => {
    test("Should return 404 error if user _id is not found", async () => {
      const userId = "nonExistentUserId";
      const response = await request(app)
        .get(`/orders/users/${userId}`)
        .set("Accept", "application/json");

      expect(response.status).to.equal(404);
      expect(response.body.error).to.contain("User not found");
    });

    test("Should return a list of orders", async () => {
      const userId = "validUserId";
      // TODO: Replace "validUserId" with an actual user ID from your database.

      const response = await request(app)
        .get(`/orders/users/${userId}`)
        .set("Accept", "application/json");

      expect(response.status).to.equal(200);
      expect(response.body.data).to.be.an("array");
    });
  });

  describe("Read order from order _id ", () => {
    test("Should return 404 error if order _id is not found", async () => {
      const orderId = "nonExistentOrderId";
      const response = await request(app)
        .get(`/orders/${orderId}`)
        .set("Accept", "application/json");

      expect(response.status).to.equal(404);
      expect(response.body.error).to.contain("Order not found");
    });

    test("Should return an order from order_id without phone number, email, or user id", async () => {
      const orderId = "validOrderId";
      // TODO: Replace "validOrderId" with an actual order ID from your database.

      const response = await request(app)
        .get(`/orders/${orderId}`)
        .set("Accept", "application/json");

      expect(response.status).to.equal(200);
      expect(response.body.data).to.be.an("object");
      expect(response.body.data.phoneNumber).to.be.undefined;
      expect(response.body.data.email).to.be.undefined;
      expect(response.body.data.user).to.be.undefined;
    });
  });

  describe("Create order", () => {
    test("Should return 400 error if phone number is not defined", async () => {
      const data = {
        email: null,
        user: null,
        isComplete: false,
        cart: [
          {
            food_id: foods[0]._id,
            specialRequest: "",
            quantity: 1,
            selectedFoodOption: null,
            selectedFoodSize: null,
          },
        ],
      };

      const response = await request(app)
        .post("/orders")
        .set("Accept", "application/json")
        .send({ data });

      expect(response.status).to.equal(400);
      expect(response.body.error).to.contain("phoneNumber");
    });

    test("Should return 400 error if phone number is not a valid phone number", async () => {
      const data = {
        phoneNumber: "1",
        email: null,
        user: null,
        isComplete: false,
        cart: [
          {
            food_id: foods[0]._id,
            specialRequest: "",
            quantity: 1,
            selectedFoodOption: null,
            selectedFoodSize: null,
          },
        ],
      };
      const response = await request(app)
        .post("/orders")
        .set("Accept", "application/json")
        .send({ data });

      expect(response.status).to.equal(400);
      expect(response.body.error).to.contain("phoneNumber");
    });

    // TODO: Add test cases for update and delete order scenarios

    test("Should return 400 error if email is not null and not a valid email", async () => {
      const data = {
        phoneNumber: "19998887777",
        email: "notValidEmail",
        user: null,
        isComplete: false,
        cart: [
          {
            food_id: foods[0]._id,
            specialRequest: "",
            quantity: 1,
            selectedFoodOption: null,
            selectedFoodSize: null,
          },
        ],
      };
      const response = await request(app)
        .post("/orders")
        .set("Accept", "application/json")
        .send({ data });

      expect(response.status).to.equal(400);
      expect(response.body.error).to.contain("email");
    });

    test("Should create order without a user _id", async () => {
      const data = {
        phoneNumber: "19998887777",
        email: "test@example.com",
        user: null,
        isComplete: false,
        cart: [
          {
            food_id: foods[0]._id,
            specialRequest: "",
            quantity: 1,
            selectedFoodOption: null,
            selectedFoodSize: null,
          },
        ],
      };
      const response = await request(app)
        .post("/orders")
        .set("Accept", "application/json")
        .send({ data });

      expect(response.status).to.equal(201);
      expect(response.body.data.phoneNumber).to.equal(data.phoneNumber);
      expect(response.body.data.email).to.equal(data.email);
      expect(response.body.data.user).to.be.undefined;
    });

    test("Should create order without an email", async () => {
      const data = {
        phoneNumber: "19998887777",
        email: null,
        user: null,
        isComplete: false,
        cart: [
          {
            food_id: foods[0]._id,
            specialRequest: "",
            quantity: 1,
            selectedFoodOption: null,
            selectedFoodSize: null,
          },
        ],
      };
      const response = await request(app)
        .post("/orders")
        .set("Accept", "application/json")
        .send({ data });

      expect(response.status).to.equal(201);
      expect(response.body.data.phoneNumber).to.equal(data.phoneNumber);
      expect(response.body.data.email).to.be.undefined;
    });

    describe("Cart", () => {
      test("Should return 400 error if cart does not exist", async () => {
        const data = {
          phoneNumber: "19998887777",
          email: "test@example.com",
          user: null,
          isComplete: false,
        };
        const response = await request(app)
          .post("/orders")
          .set("Accept", "application/json")
          .send({ data });

        expect(response.status).to.equal(400);
        expect(response.body.error).to.contain("cart");
      });

      test("Should return 400 error if cart is not an array", async () => {
        const data = {
          phoneNumber: "19998887777",
          email: "test@example.com",
          user: null,
          isComplete: false,
          cart: {},
        };
        const response = await request(app)
          .post("/orders")
          .set("Accept", "application/json")
          .send({ data });

        expect(response.status).to.equal(400);
        expect(response.body.error).to.contain("cart is not an array");
      });

      test("Should return 400 error if cart item is not an object", async () => {
        const data = {
          phoneNumber: "19998887777",
          email: "test@example.com",
          user: null,
          isComplete: false,
          cart: ["this is not an object"],
        };
        const response = await request(app)
          .post("/orders")
          .set("Accept", "application/json")
          .send({ data });

        expect(response.status).to.equal(400);
        expect(response.body.error).to.contain("cart item");
      });

      test("Should return 400 error if cart item does not have a food id", async () => {
        const data = {
          phoneNumber: "19998887777",
          email: "test@example.com",
          user: null,
          isComplete: false,
          cart: [
            {
              specialRequest: "",
              quantity: 1,
              selectedFoodOption: null,
              selectedFoodSize: null,
            },
          ],
        };
        const response = await request(app)
          .post("/orders")
          .set("Accept", "application/json")
          .send({ data });

        expect(response.status).to.equal(400);
        expect(response.body.error).to.contain("food id");
      });

      // test("Should return 400 error if cart item food _id is not a number", async () => {
      //   const data = {
      //     phoneNumber: "555-555-5555",
      //     cart: [{ food_id: "notANumber", quantity: 1 }],
      //   };
      //   const response = await request(app)
      //     .post("/orders")
      //     .set("Accept", "application/json")
      //     .send({ data });

      //   expect(response.status).to.equal(400);
      //   expect(response.body.error).to.contain("food _id");
      // });

      test("Should return 400 error if cart item does not have a quantity", async () => {
        const data = {
          phoneNumber: "19998887777",
          email: null,
          user: null,
          isComplete: false,
          cart: [
            {
              food_id: foods[0]._id,
              specialRequest: "",
              selectedFoodOption: null,
              selectedFoodSize: null,
            },
          ],
        };
        const response = await request(app)
          .post("/orders")
          .set("Accept", "application/json")
          .send({ data });

        expect(response.status).to.equal(400);
        expect(response.body.error).to.contain("quantity");
      });

      test("Should return 400 error if cart item quantity is not a number", async () => {
        const data = {
          phoneNumber: "19998887777",
          email: null,
          user: null,
          isComplete: false,
          cart: [
            {
              food_id: foods[0]._id,
              specialRequest: "",
              quantity: "1",
              selectedFoodOption: null,
              selectedFoodSize: null,
            },
          ],
        };
        const response = await request(app)
          .post("/orders")
          .set("Accept", "application/json")
          .send({ data });

        expect(response.status).to.equal(400);
        expect(response.body.error).to.contain("quantity");
      });

      test("Should return 400 error if cart item specialRequest is not a string", async () => {
        const data = {
          phoneNumber: "19998887777",
          email: null,
          user: null,
          isComplete: false,
          cart: [
            {
              food_id: foods[0]._id,
              specialRequest: {},
              quantity: 1,
              selectedFoodOption: null,
              selectedFoodSize: null,
            },
          ],
        };
        const response = await request(app)
          .post("/orders")
          .set("Accept", "application/json")
          .send({ data });

        expect(response.status).to.equal(400);
        expect(response.body.error).to.contain("specialRequest");
      });

      test("Should return 400 error if cart item specialRequest is not at most a certain length", async () => {
        const data = {
          phoneNumber: "19998887777",
          email: null,
          user: null,
          isComplete: false,
          cart: [
            {
              food_id: foods[0]._id,
              specialRequest:
                "This special request is too long and should result in an error. THIS IS WAY TOOO LOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOONG",
              quantity: 1,
              selectedFoodOption: null,
              selectedFoodSize: null,
            },
          ],
        };
        const response = await request(app)
          .post("/orders")
          .set("Accept", "application/json")
          .send({ data });

        expect(response.status).to.equal(400);
        expect(response.body.error).to.contain("specialRequest");
      });

      test("Should return 400 error if cart item does not have a valid property", async () => {
        const data = {
          phoneNumber: "19998887777",
          email: null,
          user: null,
          isComplete: false,
          cart: [
            {
              food_id: foods[0]._id,
              specialRequest: "",
              quantity: 1,
              selectedFoodOption: null,
              selectedFoodSize: null,
            },
          ],
        };
        const response = await request(app)
          .post("/orders")
          .set("Accept", "application/json")
          .send({ data });

        expect(response.status).to.equal(400);
        expect(response.body.error).to.contain("invalidProperty");
      });

      test("Should return 400 error if cart item does not have all required properties", async () => {
        const data = {
          phoneNumber: "19998887777",
          email: null,
          user: null,
          isComplete: false,
          cart: [
            {
              food_id: foods[0]._id,
              specialRequest: {},
              selectedFoodOption: null,
              selectedFoodSize: null,
            },
          ],
        };
        const response = await request(app)
          .post("/orders")
          .set("Accept", "application/json")
          .send({ data });

        expect(response.status).to.equal(400);
        expect(response.body.error).to.contain("required");
      });

      test("Should create order if specialRequest does not exist", async () => {
        const data = {
          phoneNumber: "19998887777",
          email: null,
          user: null,
          isComplete: false,
          cart: [
            {
              food_id: foods[0]._id,
              quantity: 1,
              selectedFoodOption: null,
              selectedFoodSize: null,
            },
          ],
        };
        const response = await request(app)
          .post("/orders")
          .set("Accept", "application/json")
          .send({ data });

        expect(response.status).to.equal(201);
        expect(response.body.order).to.be.an("object");
        expect(response.body.order.cart[0].specialRequest).to.equal("");
      });

      test("Should create order if selectedFoodOption does not exist", async () => {
        const data = {
          phoneNumber: "19998887777",
          email: null,
          user: null,
          isComplete: false,
          cart: [
            {
              food_id: foods[0]._id,
              specialRequest: "",
              quantity: 1,
              selectedFoodSize: null,
            },
          ],
        };
        const response = await request(app)
          .post("/orders")
          .set("Accept", "application/json")
          .send({ data });

        expect(response.status).to.equal(201);
        expect(response.body.order).to.be.an("object");
        expect(response.body.order.cart[0].selectedFoodOption).to.be.undefined;
      });

      test("Should create order if selectedFoodSize does not exist", async () => {
        const data = {
          phoneNumber: "19998887777",
          email: null,
          user: null,
          isComplete: false,
          cart: [
            {
              food_id: foods[0]._id,
              specialRequest: "",
              quantity: 1,
              selectedFoodOption: null,
            },
          ],
        };
        const response = await request(app)
          .post("/orders")
          .set("Accept", "application/json")
          .send({ data });

        expect(response.status).to.equal(201);
        expect(response.body.order).to.be.an("object");
        expect(response.body.order.cart[0].selectedFoodSize).to.be.undefined;
      });
    });
  });

  describe("Delete order", () => {});
});
