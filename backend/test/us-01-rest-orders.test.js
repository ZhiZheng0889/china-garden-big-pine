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
      test('Should have items property in an order object', async () => {
        const response = await request(app)
          .get('/order')
          .set('Accept', 'application/json');
        expect(response.status).to.equal(200);
        expect(response.body.error).to.be.undefined;
        expect(response.body.data[0].items[0].food_id).to.equal(1);
      });
      test('Should return orders and a status code of 200', async () => {
        const response = await request(app)
          .get('/order')
          .set('Accept', 'application/json');
        expect(response.status).to.equal(200);
        expect(response.body.error).to.be.undefined;
        expect(response.body.data[0].items[0].food_id).to.equal(1);
        expect(response.body.data[1].user_id).to.equal(1);
      });

      test('Should combine order items that are the same (including the requests) and have quantity in the response', async () => {
        const response = await request(app)
          .get('/order')
          .set('Accept', 'application/json');
        expect(response.status).to.equal(200);
        expect(response.body.error).to.be.undefined;
        expect(response.body.data[0].items[0].food_id).to.equal(1);
        expect(response.body.data[1].user_id).to.equal(1);
        expect(response.body.data[1].items[1].quantity).to.equal(2);
        expect(response.body.data[1].items[2].quantity).to.equal(2);
        expect(response.body.data[1].items[2].requests).to.equal('Allergy!');
      });
    });
  });

  describe('Read order', () => {
    describe('GET /order/:orderId', () => {
      test('Should return 404 for orderId not found', async () => {
        const response = await request(app)
          .get('/order/9999')
          .expect('Accept', 'application/json');
        expect(response.status).to.equal(404);
        expect(response.body.error).to.contain('9999');
      });

      test('Should return single order with 200 status code', async () => {
        const response = await request(app)
          .get('order/1')
          .expect('Accept', 'application/json');

        expect(response.status).to.equal(200);
        expect(response.body.error).to.be.undefined;
        expect(response.body.data['phone_number']).to.equal('9198675309');
        expect(response.body.data.items[0].food_id).to.equal(1);
        expect(response.body.data.items[1].food_id).to.equal(3);
      });

      test('Should combine order items that are the same (including the requests) and have quantity in the response', async () => {
        const response = await request(app)
          .get('/order/2')
          .set('Accept', 'application/json');
        expect(response.status).to.equal(200);
        expect(response.body.error).to.be.undefined;
        expect(response.body.data.items[1].quantity).to.equal(2);
        expect(response.body.data.items[2].quantity).to.equal(2);
        expect(response.body.data.items[2].requests).to.equal('Allergy!');
      });
    });
  });

  // describe('Create order', () => {
  //   describe('POST /order', () => {});
  // });

  // describe('Delete order', () => {
  //   describe('DELETE /order/oder_id', () => {});
  // });
});
