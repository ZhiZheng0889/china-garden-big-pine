const chai = require("chai");
const chaiHttp = require("chai-http");
const mongoose = require("mongoose");

const { expect } = chai;
chai.use(chaiHttp);

const User = require("../models/User");

describe("User model", () => {
  before(async () => {
    // Connect to the MongoDB test database
    const uri = "mongodb://localhost:27017/test";
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  });

  beforeEach(async () => {
    // Clean up the User collection before each test
    await User.deleteMany({});
  });

  after(async () => {
    // Close the MongoDB connection after testing
    await mongoose.connection.close();
  });

  describe("Creating a new user", () => {
    it("should create a new user successfully", async () => {
      const newUser = new User({
        email: "test@example.com",
        firstName: "John",
        lastName: "Doe",
        isAdmin: false,
        phoneNumber: "1234567890",
        password: "password123",
      });

      const savedUser = await newUser.save();

      expect(savedUser).to.have.property("_id");
      expect(savedUser.email).to.equal("test@example.com");
      expect(savedUser.firstName).to.equal("John");
      expect(savedUser.lastName).to.equal("Doe");
      expect(savedUser.isAdmin).to.equal(false);
      expect(savedUser.phoneNumber).to.equal("1234567890");
      expect(savedUser.password).to.equal("password123");
      expect(savedUser.emailIsVerified).to.equal(false);
      expect(savedUser.phoneNumberIsVerified).to.equal(false);
    });
  });

  // Add more tests for other CRUD operations and edge cases.
  describe("Updating a user", () => {
    it("should update a user successfully", async () => {
      const newUser = new User({
        email: "test@example.com",
        firstName: "John",
        lastName: "Doe",
        isAdmin: false,
        phoneNumber: "1234567890",
        password: "password123",
      });
  
      const savedUser = await newUser.save();
  
      const updatedUser = await User.findByIdAndUpdate(
        savedUser._id,
        { firstName: "Jane" },
        { new: true }
      );
  
      expect(updatedUser).to.have.property("_id");
      expect(updatedUser.email).to.equal("test@example.com");
      expect(updatedUser.firstName).to.equal("Jane");
      expect(updatedUser.lastName).to.equal("Doe");
      expect(updatedUser.isAdmin).to.equal(false);
      expect(updatedUser.phoneNumber).to.equal("1234567890");
      expect(updatedUser.password).to.equal("password123");
      expect(updatedUser.emailIsVerified).to.equal(false);
      expect(updatedUser.phoneNumberIsVerified).to.equal(false);
    });
  });
  
});

