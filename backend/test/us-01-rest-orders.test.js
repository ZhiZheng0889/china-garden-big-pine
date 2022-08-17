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

describe('01 - List, Read, Create, and Delete orders', () => {
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

  describe('List orders', () => {
    describe('GET /order', () => {
      test('Should return orders and a status code of 200', async () => {
        const response = await request(app)
          .get('/orders')
          .set('Accept', 'application/json');

        expect(resposne.status).to.equal(200);
        expect(response.body.error).to.be.undefined;
        expect(response.body.data[0].items[0].food_id).to.equal(1);
        expect();
      });
    });
  });

  describe('Read order', () => {
    describe('GET /order/:orderId', () => {});
  });

  describe('Create order', () => {
    describe('POST /order', () => {});
  });

  describe('Delete order', () => {
    describe('DELETE /order/oder_id', () => {});
  });
});
