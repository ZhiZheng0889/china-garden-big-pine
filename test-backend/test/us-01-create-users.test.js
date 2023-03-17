const { expect } = require("chai");
const request = require("supertest");

const app = require("../src/app");
const knex = require("../src/db/connection");

describe("01 - Create and Login users", () => {
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

  describe("Create a user on /users route", () => {
    test("Should return a status of 400 for a property that is not allowed", async () => {
      const data = {
        email: "test@mail.com",
        first_name: "Test",
        phone_number: "19009009999",
        password: "12345Ab!",
        notAllowedProperty: "This Property should not be allowed",
      };
      const response = await request(app)
        .post("/users")
        .set("Accept", "application/json")
        .send({ data });
      expect(response.status).to.equal(400);
      expect(response.body.error).to.contain("notAllowedProperty");
    });

    test("Should return a status of 201 if data is valid", async () => {
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
      expect(response.body.error).to.equal.undefined;
      expect(typeof user.user_id === "number").to.be.true;
      expect(user.email).to.equal(data.email);
      expect(user.first_name).to.equal(data.first_name);
      expect(user.first_name).to.equal(data.phone_number);
      expect(user.password).to.be.undefined;
    });

    test("Should return a refreshToken ", async () => {
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
      expect(response.body.error).to.equal.undefined;
      expect(user.refreshToken).to.not.be.undefined;
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
