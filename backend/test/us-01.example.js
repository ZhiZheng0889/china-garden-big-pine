const { expect } = require("chai");
const request = require("supertest");

const app = require("../src/app");
const knex = require("../src/db/connection");

const request = require("supertest");
const app = require("../app");

describe("01 - Create and Login users", () => {
  let newUser;

  describe("Create a user on /users route", () => {
    test("Should return a status of 400 for a property that is not allowed", async () => {
      const response = await request(app)
        .post("/users")
        .send({
          invalidProperty: "Invalid Property",
        });

      expect(response.statusCode).toBe(400);
    });

    test("Should return a status of 201 if data is valid", async () => {
      const response = await request(app)
        .post("/users")
        .send({
          username: "testUser",
          email: "testuser@example.com",
          password: "testPassword",
        });

      newUser = response.body;
      expect(response.statusCode).toBe(201);
    });

    test("Should return a refreshToken ", async () => {
      const response = await request(app)
        .post("/login")
        .send({
          email: "testuser@example.com",
          password: "testPassword",
        });

      expect(response.body.refreshToken).toBeDefined();
    });
  });

  describe("Test email property", () => {
    test("Should return a status of 400 for a missing email property", async () => {
      const response = await request(app)
        .post("/users")
        .send({
          username: "testUser",
          password: "testPassword",
        });
  
      expect(response.statusCode).toBe(400);
    });
  
    test("Should return a status of 400 for an email property that is a number", async () => {
      const response = await request(app)
        .post("/users")
        .send({
          username: "testUser",
          email: 12345,
          password: "testPassword",
        });
  
      expect(response.statusCode).toBe(400);
    });
  
    test("Should return a status of 400 for an email property that is null", async () => {
      const response = await request(app)
        .post("/users")
        .send({
          username: "testUser",
          email: null,
          password: "testPassword",
        });
  
      expect(response.statusCode).toBe(400);
    });
  
    test("Should return a status of 400 for an email property that is undefined", async () => {
      const response = await request(app)
        .post("/users")
        .send({
          username: "testUser",
          email: undefined,
          password: "testPassword",
        });
  
      expect(response.statusCode).toBe(400);
    });
  
    test("Should return a status of 400 for an email property if it does not contain an @ or .", async () => {
      const response = await request(app)
        .post("/users")
        .send({
          username: "testUser",
          email: "testuserexamplecom",
          password: "testPassword",
        });
  
      expect(response.statusCode).toBe(400);
    });
  
    test("Should return a status of 400 for an email property if it does contain an @ and not a .", async () => {
      const response = await request(app)
        .post("/users")
        .send({
          username: "testUser",
          email: "testuser@examplecom",
          password: "testPassword",
        });
  
      expect(response.statusCode).toBe(400);
    });
  
    test("Should return a status of 400 for an email property if it does contain a . and not an @", async () => {
      const response = await request(app)
        .post("/users")
        .send({
          username: "testUser",
          email: "testuserexample.com",
          password: "testPassword",
        });
  
      expect(response.statusCode).toBe(400);
    });
  
    test("Should return a status of 400 if the email property is an empty string", async () => {
      const response = await request(app)
        .post("/users")
        .send({
          username: "testUser",
          email: "",
          password: "testPassword",
        });
  
      expect(response.statusCode).toBe(400);
    });
  });  

  describe("Test first_name property", () => {
    test("Should return a status of 400 for a missing first_name property", async () => {
      const response = await request(app)
        .post("/users")
        .send({
          last_name: "Doe",
          email: "johndoe@example.com",
          password: "testPassword",
        });
  
      expect(response.statusCode).toBe(400);
    });
  
    test("Should return a status of 400 if first_name is a number", async () => {
      const response = await request(app)
        .post("/users")
        .send({
          first_name: 12345,
          last_name: "Doe",
          email: "johndoe@example.com",
          password: "testPassword",
        });
  
      expect(response.statusCode).toBe(400);
    });
  
    test("Should return a status of 400 if first_name is null", async () => {
      const response = await request(app)
        .post("/users")
        .send({
          first_name: null,
          last_name: "Doe",
          email: "johndoe@example.com",
          password: "testPassword",
        });
  
      expect(response.statusCode).toBe(400);
    });
  
    test("Should return a status of 400 if first_name is undefined", async () => {
      const response = await request(app)
        .post("/users")
        .send({
          first_name: undefined,
          last_name: "Doe",
          email: "johndoe@example.com",
          password: "testPassword",
        });
  
      expect(response.statusCode).toBe(400);
    });
  
    test("Should return a status of 400 if first_name is an empty string", async () => {
      const response = await request(app)
        .post("/users")
        .send({
          first_name: "",
          last_name: "Doe",
          email: "johndoe@example.com",
          password: "testPassword",
        });
  
      expect(response.statusCode).toBe(400);
    });
  });
  
  describe("Test phone_number property", () => {
    test("Should return a status of 400 for a missing phone_number property", async () => {
      const response = await request(app)
        .post("/users")
        .send({
          first_name: "John",
          last_name: "Doe",
          email: "johndoe@example.com",
          password: "testPassword",
        });
  
      expect(response.statusCode).toBe(400);
    });
  
    test("Should return a status of 400 if the phone_number length does not equal 11 (does not have country code)", async () => {
      const response = await request(app)
        .post("/users")
        .send({
          first_name: "John",
          last_name: "Doe",
          email: "johndoe@example.com",
          password: "testPassword",
          phone_number: "123456789",
        });
  
      expect(response.statusCode).toBe(400);
    });
  
    test("Should return a status of 400 if phone_number is a number", async () => {
      const response = await request(app)
        .post("/users")
        .send({
          first_name: "John",
          last_name: "Doe",
          email: "johndoe@example.com",
          password: "testPassword",
          phone_number: 12345678901,
        });
  
      expect(response.statusCode).toBe(400);
    });
  
    test("Should return a status of 400 if phone_number is null", async () => {
      const response = await request(app)
        .post("/users")
        .send({
          first_name: "John",
          last_name: "Doe",
          email: "johndoe@example.com",
          password: "testPassword",
          phone_number: null,
        });
  
      expect(response.statusCode).toBe(400);
    });
  
    test("Should return a status of 400 if phone_number is undefined", async () => {
      const response = await request(app)
        .post("/users")
        .send({
          first_name: "John",
          last_name: "Doe",
          email: "johndoe@example.com",
          password: "testPassword",
          phone_number: undefined,
        });
  
      expect(response.statusCode).toBe(400);
    });
  
    test("Should return a status of 400 if phone_number is not only numeric characters", async () => {
      const response = await request(app)
        .post("/users")
        .send({
          first_name: "John",
          last_name: "Doe",
          email: "johndoe@example.com",
          password: "testPassword",
          phone_number: "123456789a1",
        });
  
      expect(response.statusCode).toBe(400);
    });
  
    test("Should return a status of 400 if phone_number is not only numeric characters like symbols", async () => {
      const response = await request(app)
        .post("/users")
        .send({
          first_name: "John",
          last_name: "Doe",
          email: "johndoe@example.com",
          password: "testPassword",
          phone_number: "12345678*01",
        });
  
      expect(response.statusCode).toBe(400);
    });
  
    test("Should return a status of 400 if phone_number is an empty string", async () => {
      const response = await request(app)
        .post("/users")
        .send({
          first_name: "John",
          last_name: "Doe",
          email: "johndoe@example.com",
          password: "testPassword",
          phone_number: "",
        });
      
      expect(response.statusCode).toBe(400);
    });
  });

  describe("Test password property", () => {
    test("Should return a status of 400 for a missing password property", async () => {
      const response = await request(app)
        .post("/users")
        .send({
          first_name: "John",
          last_name: "Doe",
          email: "johndoe@example.com",
          phone_number: "12345678901",
          password: "",
        });
  
      expect(response.statusCode).toBe(400);
    });
  
    test("Should return a status of 400 if password is null", async () => {
      const response = await request(app)
        .post("/users")
        .send({
          first_name: "John",
          last_name: "Doe",
          email: "johndoe@example.com",
          phone_number: "12345678901",
          password: null,
        });
  
      expect(response.statusCode).toBe(400);
    });
  
    test("Should return a status of 400 if password is undefined", async () => {
      const response = await request(app)
        .post("/users")
        .send({
          first_name: "John",
          last_name: "Doe",
          email: "johndoe@example.com",
          phone_number: "12345678901",
          password: undefined,
        });
  
      expect(response.statusCode).toBe(400);
    });
  
    test("Should return a status of 400 if password length is not greater than or equal to 8", async () => {
      const response = await request(app)
        .post("/users")
        .send({
          first_name: "John",
          last_name: "Doe",
          email: "johndoe@example.com",
          phone_number: "12345678901",
          password: "short",
        });
  
      expect(response.statusCode).toBe(400);
    });
  
    test("Should return a status of 400 if password does not contain at least one uppercase letter", async () => {
      const response = await request(app)
        .post("/users")
        .send({
          first_name: "John",
          last_name: "Doe",
          email: "johndoe@example.com",
          phone_number: "",
          password: "alllowercase123",
        });
  
      expect(response.statusCode).toBe(400);
    });
  
    test("Should return a status of 400 if password does not contain at least one lowercase letter", async () => {
      const response = await request(app)
        .post("/users")
        .send({
          first_name: "John",
          last_name: "Doe",
          email: "johndoe@example.com",
          phone_number: "",
          password: "ALLUPPERCASE123",
        });
  
      expect(response.statusCode).toBe(400);
    });
  });
  
  describe("Test duplicated values", () => {
    test("Should return a status of 409 if phone_number already exists", async () => {
      const existingUser = {
        first_name: "John",
        last_name: "Doe",
        email: "johndoe@example.com",
        password: "ALLUPPERCASE123",
        phone_number: "12345678901",
      };
      await request(app).post("/users").send(existingUser);
  
      const newUser = {
        first_name: "John",
        last_name: "Doe",
        email: "johndoe@example.com",
        password: "ALLUPPERCASE123",
        phone_number: "12345678901",
      };
      const response = await request(app).post("/users").send(newUser);
  
      expect(response.statusCode).toBe(409);
    });
  });
  
  describe("Test users not being allowed to set themselves as admin", () => {
    test("Should return a status of 400 if data has admin property", async () => {
      const userWithAdmin = {
        first_name: "John",
        last_name: "Doe",
        email: "johndoe@example.com",
        phone_number: "12345678901",
        password: "ALLUPPERCASE123",
        admin: true,
      };
      const response = await request(app).post("/users").send(userWithAdmin);
  
      expect(response.statusCode).toBe(400);
    });
  });
  
});

