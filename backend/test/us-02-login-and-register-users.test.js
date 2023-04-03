const { expect } = require("chai");
const request = require("supertest");
const { response } = require("../src/app");

const app = require("../src/app");
const knex = require("../src/db/connection");

describe("02 - Reigster and Login users", () => {
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

  describe("Register user on /users", () => {
    test("Should return a status of 409 for using an email that already exist", async () => {
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
      const response = await request(app)
        .post("/users")
        .set("Accept", "application/json")
        .send({ data: testedUser });
      expect(response.status).to.equal(409);
      expect(response.body.error).to.equal("Email already exist.");
    });

    test("Should return a status of 409 for using a phone number that already exist", async () => {
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
      const response = await request(app)
        .post("/users")
        .set("Accept", "application/json")
        .send({ data: testedUser });
      expect(response.status).to.equal(409);
      expect(response.body.error).to.equal("Phone number already exist.");
    });

    test("Should create a user and return a status code of 201, a refresh token in body, and access token in httpOnly cookie", async () => {
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
