const { expect } = require("chai");
const request = require("supertest");

const app = require("../src/app");
const { MongoClient } = require("mongodb");

describe("Update Price of Food Item", () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(global.__MONGO_URI__, {
      useNewUrlParser: true,
    });
    db = await connection.db(global.__MONGO_DB_NAME__);
  });

  afterAll(async () => {
    await connection.close();
    await db.close();
  });

  describe("PATCH /foods/:id", () => {
    let foodId;

    beforeEach(async () => {
      const food = {
        name: "Test Food Item",
        base_price: 10.99,
        category: "Test Category",
        description: "Test description.",
        spicy: false,
        available: true,
      };
      const res = await db.collection("foods").insertOne(food);
      foodId = res.insertedId.toString();
    });

    afterEach(async () => {
      await db.collection("foods").deleteMany({});
    });

    test("Should return 200 status after updating the price", async () => {
      const update = {
        data: {
          price: 15.99,
        },
      };

      const response = await request(app)
        .patch(`/foods/${foodId}`)
        .set("Accept", "application/json")
        .send(update);

      expect(response.status).to.equal(200);
    });

    test("Should update the price of the food item", async () => {
      const update = {
        data: {
          price: 15.99,
        },
      };

      await request(app)
        .patch(`/foods/${foodId}`)
        .set("Accept", "application/json")
        .send(update);

      const updatedFood = await db
        .collection("foods")
        .findOne({ _id: new ObjectId(foodId) });

      expect(updatedFood.base_price).to.equal(15.99);
    });

    test("Should return an error if the food item is not found", async () => {
      const update = {
        data: {
          price: 15.99,
        },
      };

      const invalidId = "invalid_id";
      const response = await request(app)
        .patch(`/foods/${invalidId}`)
        .set("Accept", "application/json")
        .send(update);

      expect(response.status).to.equal(404);
      expect(response.body.error).to.equal("Food item not found.");
    });

    describe("Test email property", () => {
      test("Should return a status of 400 for a missing email property", async () => {
        const data = {
          first_name: "Test",
          phone_number: "19009009999",
          password: "12345Ab!",
        };
        const response = await request(app)
          .post("/users")
          .set("Accept", "application/json")
          .send({ data });
        expect(response.status).to.equal(400);
        expect(response.body.error).to.contain("email");
      });

      test("Should return a status of 400 for a email property is a number", async () => {
        const data = {
          email: 1,
          first_name: "Test",
          phone_number: "19009009999",
          password: "12345Ab!",
        };
        const response = await request(app)
          .post("/users")
          .set("Accept", "application/json")
          .send({ data });
        expect(response.status).to.equal(400);
        expect(response.body.error).to.contain("email");
      });

      test("Should return a status of 400 for a email property is null", async () => {
        const data = {
          email: null,
          first_name: "Test",
          phone_number: "19009009999",
          password: "12345Ab!",
        };
        const response = await request(app)
          .post("/users")
          .set("Accept", "application/json")
          .send({ data });
        expect(response.status).to.equal(400);
        expect(response.body.error).to.contain("email");
      });

      test("Should return a status of 400 for a email property is undefined", async () => {
        const data = {
          email: undefined,
          first_name: "Test",
          phone_number: "19009009999",
          password: "12345Ab!",
        };
        const response = await request(app)
          .post("/users")
          .set("Accept", "application/json")
          .send({ data });
        expect(response.status).to.equal(400);
        expect(response.body.error).to.contain("email");
      });

      test("Should return a status of 400 for a email property if it does not conatin an @ or .", async () => {
        const data = {
          email: "thisisnotanemail",
          first_name: "Test",
          phone_number: "19009009999",
          password: "12345Ab!",
        };
        const response = await request(app)
          .post("/users")
          .set("Accept", "application/json")
          .send({ data });
        expect(response.status).to.equal(400);
        expect(response.body.error).to.equal(
          `email property: ${data.email} is not properly formatted`
        );
      });

      test("Should return a status of 400 for a email property if it does contain an @ and not a .", async () => {
        const data = {
          email: "thisisnotanemail@mail",
          first_name: "Test",
          phone_number: "19009009999",
          password: "12345Ab!",
        };
        const response = await request(app)
          .post("/users")
          .set("Accept", "application/json")
          .send({ data });
        expect(response.status).to.equal(400);
        expect(response.body.error).to.equal(
          `email property: ${data.email} is not properly formatted`
        );
      });

      test("Should return a status of 400 for a email property if it does contain an . and not a @", async () => {
        const data = {
          email: "thisisnotanemail.mail",
          first_name: "Test",
          phone_number: "19009009999",
          password: "12345Ab!",
        };
        const response = await request(app)
          .post("/users")
          .set("Accept", "application/json")
          .send({ data });
        expect(response.status).to.equal(400);
        expect(response.body.error).to.equal(
          `email property: ${data.email} is not properly formatted`
        );
      });

      test("Should return a status of 400 if email property is an empty string", async () => {
        const data = {
          email: "",
          first_name: "Test",
          phone_number: "19009009999",
          password: "12345Ab!",
        };
        const response = await request(app)
          .post("/users")
          .set("Accept", "application/json")
          .send({ data });
        expect(response.status).to.equal(400);
        expect(response.body.error).to.contain("email");
      });
    });

    describe("Test first_name property", () => {
      test("Should return a status of 400 for a missing first_name property", async () => {
        const data = {
          email: "test@mail.com",
          phone_number: "19009009999",
          password: "12345Ab!",
        };
        const response = await request(app)
          .post("/users")
          .set("Accept", "application/json")
          .send({ data });
        expect(response.status).to.equal(400);
        expect(response.body.error).to.contain("first_name");
      });

      test("Should return a status of 400 if first_name is a number", async () => {
        const data = {
          email: "test@mail.com",
          first_name: 1,
          phone_number: "19009009999",
          password: "12345Ab!",
        };
        const response = await request(app)
          .post("/users")
          .set("Accept", "application/json")
          .send({ data });
        expect(response.status).to.equal(400);
        expect(response.body.error).to.contain("first_name");
      });

      test("Should return a status of 400 if first_name is null", async () => {
        const data = {
          email: "test@mail.com",
          first_name: null,
          phone_number: "19009009999",
          password: "12345Ab!",
        };
        const response = await request(app)
          .post("/users")
          .set("Accept", "application/json")
          .send({ data });
        expect(response.status).to.equal(400);
        expect(response.body.error).to.contain("first_name");
      });

      test("Should return a status of 400 if first_name is undefined", async () => {
        const data = {
          email: "test@mail.com",
          first_name: undefined,
          phone_number: "19009009999",
          password: "12345Ab!",
        };
        const response = await request(app)
          .post("/users")
          .set("Accept", "application/json")
          .send({ data });
        expect(response.status).to.equal(400);
        expect(response.body.error).to.contain("first_name");
      });

      test("Should return a status of 400 if first_name is an empty string", async () => {
        const data = {
          email: "test@mail.com",
          first_name: "",
          phone_number: "19009009999",
          password: "12345Ab!",
        };
        const response = await request(app)
          .post("/users")
          .set("Accept", "application/json")
          .send({ data });
        expect(response.status).to.equal(400);
        expect(response.body.error).to.contain("first_name");
      });
    });

    describe("Test phone_number property", () => {
      test("Should return a status of 400 for a missing phone_number property", async () => {
        const data = {
          email: "test@mail.com",
          first_name: "Test",
          password: "12345Ab!",
        };
        const response = await request(app)
          .post("/users")
          .set("Accept", "application/json")
          .send({ data });
        expect(response.status).to.equal(400);
        expect(response.body.error).to.contain("phone_number");
      });

      test("Should return a status of 400 if the phone_number length does not equal 11 (does not have country code)", async () => {
        const data = {
          email: "test@mail.com",
          first_name: "Test",
          phone_number: "9009009999",
          password: "12345Ab!",
        };
        const response = await request(app)
          .post("/users")
          .set("Accept", "application/json")
          .send({ data });
        expect(response.status).to.equal(400);
        expect(response.body.error).to.equal(
          "Phone Number is not the proper length and could be missing: Country Code"
        );
      });

      test("Should return a status of 400 if phone_number is a number", async () => {
        const data = {
          email: "test@mail.com",
          first_name: "Test",
          phone_number: 1,
          password: "12345Ab!",
        };
        const response = await request(app)
          .post("/users")
          .set("Accept", "application/json")
          .send({ data });
        expect(response.status).to.equal(400);
        expect(response.body.error).to.contain("phone_number");
      });

      test("Should return a status of 400 if phone_number is null", async () => {
        const data = {
          email: "test@mail.com",
          first_name: "Test",
          phone_number: null,
          password: "12345Ab!",
        };
        const response = await request(app)
          .post("/users")
          .set("Accept", "application/json")
          .send({ data });
        expect(response.status).to.equal(400);
        expect(response.body.error).to.contain("phone_number");
      });

      test("Should return a status of 400 if phone_number is undefined", async () => {
        const data = {
          email: "test@mail.com",
          first_name: "Test",
          phone_number: undefined,
          password: "12345Ab!",
        };
        const response = await request(app)
          .post("/users")
          .set("Accept", "application/json")
          .send({ data });
        expect(response.status).to.equal(400);
        expect(response.body.error).to.contain("phone_number");
      });

      test("Should return a status of 400 if phone_number is not only numeric characters", async () => {
        const data = {
          email: "test@mail.com",
          first_name: "Test",
          phone_number: "9009as9000",
          password: "12345Ab!",
        };
        const response = await request(app)
          .post("/users")
          .set("Accept", "application/json")
          .send({ data });
        expect(response.status).to.equal(400);
        expect(response.body.error).to.contain("phone_number");
      });

      test("Should return a status of 400 if phone_number is not only numeric characters like symbols", async () => {
        const data = {
          email: "test@mail.com",
          first_name: "Test",
          phone_number: "12345!%#901",
          password: "12345Ab!",
        };
        const response = await request(app)
          .post("/users")
          .set("Accept", "application/json")
          .send({ data });
        expect(response.status).to.equal(400);
        expect(response.body.error).to.contain("phone_number");
      });

      test("Should return a status of 400 if phone_number is an empty string", async () => {
        const data = {
          email: "test@mail.com",
          first_name: "Test",
          phone_number: "",
          password: "12345Ab!",
        };
        const response = await request(app)
          .post("/users")
          .set("Accept", "application/json")
          .send({ data });
        expect(response.status).to.equal(400);
        expect(response.body.error).to.contain("phone_number");
      });
    });

    describe("Test password property", () => {
      test("Should return a status of 400 for a missing password property", async () => {
        const data = {
          email: "test@mail.com",
          first_name: "Test",
          phone_number: "19009009999",
        };
        const response = await request(app)
          .post("/users")
          .set("Accept", "application/json")
          .send({ data });
        expect(response.status).to.equal(400);
        expect(response.body.error).to.contain("password");
      });

      test("Should return a status of 400 if password is null", async () => {
        const data = {
          email: "test@mail.com",
          first_name: "Test",
          phone_number: "19009009999",
          password: null,
        };
        const response = await request(app)
          .post("/users")
          .set("Accept", "application/json")
          .send({ data });
        expect(response.status).to.equal(400);
        expect(response.body.error).to.contain("password");
      });

      test("Should return a status of 400 if password is undefined", async () => {
        const data = {
          email: "test@mail.com",
          first_name: "Test",
          phone_number: "19009009999",
          password: undefined,
        };
        const response = await request(app)
          .post("/users")
          .set("Accept", "application/json")
          .send({ data });
        expect(response.status).to.equal(400);
        expect(response.body.error).to.contain("password");
      });

      test("Should return a status of 400 if password is undefined", async () => {
        const data = {
          email: "test@mail.com",
          first_name: "Test",
          phone_number: "19009009999",
          password: undefined,
        };
        const response = await request(app)
          .post("/users")
          .set("Accept", "application/json")
          .send({ data });
        expect(response.status).to.equal(400);
        expect(response.body.error).to.contain("password");
      });

      test("Should return a status of 400 if password length is not greater than or equal to 8", async () => {
        const data = {
          email: "test@mail.com",
          first_name: "Test",
          phone_number: "19009009999",
          password: "123Ab!",
        };
        const response = await request(app)
          .post("/users")
          .set("Accept", "application/json")
          .send({ data });
        expect(response.status).to.equal(400);
        expect(response.body.error).to.equal(
          "password length must be greater than 7 characters"
        );
      });

      test("Should return a status of 400 if password does not contain at least one uppercase letter", async () => {
        const data = {
          email: "test@mail.com",
          first_name: "Test",
          phone_number: "19009009999",
          password: "123456b!",
        };
        const response = await request(app)
          .post("/users")
          .set("Accept", "application/json")
          .send({ data });
        expect(response.status).to.equal(400);
        expect(response.body.error).to.equal(
          "password must contain at least one uppercase letter"
        );
      });

      test("Should return a status of 400 if password does not contain at least one lowercase letter", async () => {
        const data = {
          email: "test@mail.com",
          first_name: "Test",
          phone_number: "19009009999",
          password: "123456A!",
        };
        const response = await request(app)
          .post("/users")
          .set("Accept", "application/json")
          .send({ data });
        expect(response.status).to.equal(400);
        expect(response.body.error).to.equal(
          "password must contain at least one lowercase letter"
        );
      });
    });

    describe("Test duplicated values", () => {
      test("Should return a status of 409 if email already exist", async () => {
        const data = {
          email: "anthonymclamb@mail.com",
          first_name: "Test",
          phone_number: "19009009999",
          password: "123456Aa!",
        };
        const response = await request(app)
          .post("/users")
          .set("Accept", "application/json")
          .send({ data });
        expect(response.status).to.equal(400);
        expect(response.body.error).to.equal("Email already exist");
      });

      test("Should return a status of 409 if phone_number already exist", async () => {
        const data = {
          email: "test@mail.com",
          first_name: "Test",
          phone_number: "18454994090",
          password: "123456Aa!",
        };
        const response = await request(app)
          .post("/users")
          .set("Accept", "application/json")
          .send({ data });
        expect(response.status).to.equal(400);
        expect(response.body.error).to.equal("Phone number already exist");
      });
    });

    describe("Test users not being allowed to set them self as admin", () => {
      test("Should return a status of 400 if data has admin property", async () => {
        const data = {
          email: "test@mail.com",
          first_name: "Test",
          phone_number: "19009001234",
          password: "123456Aa!",
          isAdmin: true,
        };
        const response = await request(app)
          .post("/users")
          .set("Accept", "application/json")
          .send({ data });
        expect(response.status).to.equal(400);
        expect(response.body.error).to.contain("isAdmin");
      });
    });
  });
});
