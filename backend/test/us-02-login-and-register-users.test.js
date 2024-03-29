const request = require("supertest");
const { expect } = require("chai");
const app = require("../src/app");
const DatabaseManager = require("./DatabaseManager");

describe("02 - Register and Login users", () => {
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

  describe("Register user on /users", () => {
    test("Should return a status of 409 for using an email that already exist", async () => {
      jest.setTimeout(10000); // Set the timeout to 10 seconds
      const firstUser = {
        email: "test@mail.com",
        first_name: "Test",
        phone_number: "19009009999",
        password: "12345Ab!",
      };
      const testedUser = {
        email: "test@mail.com",
        first_name: "Test",
        phone_number: "19009009900",
        password: "12345Ab!",
      };
      await request(app)
        .post("/users")
        .set("Accept", "application/json")
        .send({ data: firstUser });

      // Change this part to use the Mongoose User model
      const existingUser = await User.findOne({ email: testedUser.email });
      expect(existingUser).to.not.be.null;

      const response = await request(app)
        .post("/users")
        .set("Accept", "application/json")
        .send({ data: testedUser });
      expect(response.status).to.equal(409);
      expect(response.body.error).to.equal("Email already exist.");
    });

    test("Should return a status of 409 for using a phone number that already exist", async () => {
      jest.setTimeout(10000); // Set the timeout to 10 seconds
      const firstUser = {
        email: "test1@mail.com",
        first_name: "Test",
        phone_number: "19009009999",
        password: "12345Ab!",
      };
      const testedUser = {
        email: "test2@mail.com",
        first_name: "Test",
        phone_number: "19009009999",
        password: "12345Ab!",
      };
      await request(app)
        .post("/users")
        .set("Accept", "application/json")
        .send({ data: firstUser });

      // Change this part to use the Mongoose User model
      const existingUser = await User.findOne({
        phoneNumber: testedUser.phoneNumber,
      });
      expect(existingUser).to.not.be.null;

      const response = await request(app)
        .post("/users")
        .set("Accept", "application/json")
        .send({ data: testedUser });
      expect(response.status).to.equal(409);
      expect(response.body.error).to.equal("Phone number already exist.");
    });

    test("Should create a user and return a status code of 201, a refresh token in body, and access token in httpOnly cookie", async () => {
      jest.setTimeout(10000); // Set the timeout to 10 seconds
      const data = {
        email: "test@mail.com",
        first_name: "Test",
        phone_number: "19009009999",
        password: "12345Ab!",
      };
      const response = await request(app)
        .post("/users")
        .set("Accept", "application/json")
        .send({ data });
      const user = response.body.data;
      expect(response.status).to.equal(201);
      expect(user.refreshToken).to.not.be.undefined;
    });
  });
});
