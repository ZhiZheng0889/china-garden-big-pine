const request = require("supertest");
const { expect } = require("chai");
const app = require("../src/app");
const DatabaseManager = require("./DatabaseManager");

describe("01 - create users", () => {
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

  describe("Creating a new user", () => {
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

    it("Should return 409 error if email already exist", async () => {});

    it("Should return 409 error if phoneNumber already exist", async () => {});

    it("Should create a new user and return a status of 201", async () => {
      const data = {
        email: "test@example.com",
        firstName: "John",
        lastName: "Doe",
        isAdmin: false,
        phoneNumber: "1234567890",
        password: "password123",
      };

      const response = await request(app)
        .post("/users")
        .set("Accept", "application/json")
        .send({ data });

      expect(response.status).to.equal(201);
    });

    it("Should create a new user successfully", async () => {
      const data = {
        email: "test@example.com",
        firstName: "John",
        lastName: "Doe",
        isAdmin: false,
        phoneNumber: "1234567890",
        password: "password123",
      };

      const response = await request(app)
        .post("/users")
        .set("Accept", "application/json")
        .send({ data });

      const {
        data: { userData },
      } = response.body;

      expect(userData.status).to.equal(201);
      expect(userData).to.have.property("_id");
      expect(userData.email).to.equal("test@example.com");
      expect(userData.firstName).to.equal("John");
      expect(userData.lastName).to.equal("Doe");
      expect(userData.isAdmin).to.equal(false);
      expect(userData.phoneNumber).to.equal("1234567890");
      expect(userData.emailIsVerified).to.equal(false);
      expect(userData.phoneNumberIsVerified).to.equal(false);
    });

    it("Should create a new user and not return a password", async () => {
      const data = {
        email: "test@example.com",
        firstName: "John",
        lastName: "Doe",
        isAdmin: false,
        phoneNumber: "1234567890",
        password: "password123",
      };

      const response = await request(app)
        .post("/users")
        .set("Accept", "application/json")
        .send({ data });

      expect(response.status).to.equal(201);
      expect(response.body.data.password).to.be.undefined;
    });
  });

  // describe("Updating a user", () => {
  //   it("Should update a user successfully", async () => {
  //     const newUser = {
  //       email: "test@example.com",
  //       firstName: "John",
  //       lastName: "Doe",
  //       isAdmin: false,
  //       phoneNumber: "1234567890",
  //       password: "password123",
  //     };

  //     const savedUser = await newUser.save();

  //     const updatedUser = await User.findByIdAndUpdate(
  //       savedUser._id,
  //       { firstName: "Jane" },
  //       { new: true }
  //     );

  //     expect(updatedUser.status).to.equal(200);
  //     expect(updatedUser).to.have.property("_id");
  //     expect(updatedUser.email).to.equal("test@example.com");
  //     expect(updatedUser.firstName).to.equal("Jane");
  //     expect(updatedUser.lastName).to.equal("Doe");
  //     expect(updatedUser.isAdmin).to.equal(false);
  //     expect(updatedUser.phoneNumber).to.equal("1234567890");
  //     expect(updatedUser.emailIsVerified).to.equal(false);
  //     expect(updatedUser.phoneNumberIsVerified).to.equal(false);
  //   });

  //   it("Should update a user successfully and not return the password", async () => {
  //     const newUser = new User({
  //       email: "test@example.com",
  //       firstName: "John",
  //       lastName: "Doe",
  //       isAdmin: false,
  //       phoneNumber: "1234567890",
  //       password: "password123",
  //     });

  //     const savedUser = await newUser.save();

  //     const updatedUser = await User.findByIdAndUpdate(
  //       savedUser._id,
  //       { firstName: "Jane" },
  //       { new: true }
  //     );

  //     expect(updatedUser.status).to.equal(200);
  //     expect(updatedUser.password).to.be.undefined;
  //   });
  // });
});
