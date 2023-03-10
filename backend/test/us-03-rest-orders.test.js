const { expect } = require('chai');
const request = require('supertest');
const app = require('../src/app');
const knex = require('../src/db/connection');
/*
Create rest api for orders to be able to list, 
read one order, 
update order, 
create order, 
delete order
*/

describe('01 - List, Read, Create, update, and Delete orders', () => {
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

  describe('Not found handler', () => {
    test('Should return 404 for non-existent route', async () => {
      const response = await request(app)
        .get('/notaroute')
        .set('Accept', 'application/json');

      expect(response.status).to.equal(404);
      expect(response.body.error).to.equal('Path not found: /notaroute');
    });
  });

  describe('Create orders', () => {
    test('Should return 400 if data property is missing', async () => {
      const response = await request(app)
        .post('/orders')
        .set('Accept', 'application/json')
        .send({});

      expect(response.status).to.equal(400);
    });

    test('Should return 400 if data property is empty', async () => {
      const response = await request(app)
        .post('/orders')
        .set('Accept', 'application/json')
        .send({ data: {} });

      expect(response.status).to.equal(400);
    });

    test('Should return 400 if user_id is missing', async () => {
      const data = {
        cart: [
          {
            food_id: 12,
            name: 'BBQ Spare Ribs',
            description: null,
            total: 37.9,
            base_price: 10.95,
            option: null,
            size: {
              small: {
                upCharge: 0,
              },
              large: {
                upCharge: 8,
              },
            },
            quantity: 1,
            specialRequest: 'NO BBQ',
            currentSize: 'large',
          },
        ],
        email: 'mail@mail.com',
      };

      const response = await request(app)
        .post('/orders')
        .set('Accept', 'application/json')
        .send({ data });

      expect(response.status).to.equal(400);
      expect(response.body.error).to.contain('user_id');
    });

    test('Should return 400 if email is missing', async () => {
      const data = {
        cart: [
          {
            food_id: 12,
            name: 'BBQ Spare Ribs',
            description: null,
            total: 37.9,
            base_price: 10.95,
            option: null,
            size: {
              small: {
                upCharge: 0,
              },
              large: {
                upCharge: 8,
              },
            },
            quantity: 1,
            specialRequest: 'NO BBQ',
            currentSize: 'large',
          },
        ],
        user_id: 1,
      };

      const response = await request(app)
        .post('/orders')
        .set('Accept', 'application/json')
        .send({ data });

      expect(response.status).to.equal(400);
      expect(response.body.error).to.contain('email');
    });

    test('Should return 400 if cart is missing', async () => {
      const data = {
        user_id: 1,
        email: 'mail@mail.com',
      };

      const response = await request(app)
        .post('/orders')
        .set('Accept', 'application/json')
        .send({ data });

      expect(response.status).to.equal(400);
      expect(response.body.error).to.contain('cart');
    });

    test('Should return 400 if user_id is not a number', async () => {
      const data = {
        cart: [
          {
            food_id: 12,
            name: 'BBQ Spare Ribs',
            description: null,
            total: 37.9,
            base_price: 10.95,
            option: null,
            size: {
              small: {
                upCharge: 0,
              },
              large: {
                upCharge: 8,
              },
            },
            quantity: 1,
            specialRequest: 'NO BBQ',
            currentSize: 'large',
          },
        ],
        user_id: '1',
        email: 'mail@mail.com',
      };

      const response = await request(app)
        .post('/orders')
        .set('Accept', 'application/json')
        .send({ data });

      expect(response.status).to.equal(400);
      expect(response.body.error).to.contain('Id must be a number');
    });

    test('Should return 400 if food_id is missing in cart', async () => {
      const data = {
        cart: [
          {
            name: 'BBQ Spare Ribs',
            description: null,
            total: 37.9,
            base_price: 10.95,
            option: null,
            size: {
              small: {
                upCharge: 0,
              },
              large: {
                upCharge: 8,
              },
            },
            quantity: 1,
            specialRequest: 'NO BBQ',
            currentSize: 'large',
          },
        ],
        user_id: 1,
        email: 'mail@mail.com',
      };

      const response = await request(app)
        .post('/orders')
        .set('Accept', 'application/json')
        .send({ data });

      expect(response.status).to.equal(400);
      expect(response.body.error).to.contain('food_id');
    });

    test('Should return 400 if quantity is missing in cart', async () => {
      const data = {
        cart: [
          {
            food_id: 12,
            name: 'BBQ Spare Ribs',
            description: null,
            total: 37.9,
            base_price: 10.95,
            option: null,
            size: {
              small: {
                upCharge: 0,
              },
              large: {
                upCharge: 8,
              },
            },
            quantity: 1,
            specialRequest: 'NO BBQ',
            currentSize: 'large',
          },
        ],
        user_id: 1,
        email: 'mail@mail.com',
      };

      const response = await request(app)
        .post('/orders')
        .set('Accept', 'application/json')
        .send({ data });

      expect(response.status).to.equal(400);
      expect(response.body.error).to.contain('food_id');
    });

    test('Should allow including phone number and return 200');
  });
});
