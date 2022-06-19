const { expect } = require('chai');
const request = require('supertest');

const app = require('../src/app');
const knex = require('../src/db/connection');

describe('00 - List and Query Food From Categories', () => {
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

  describe('GET /foods', () => {
    test('Should return 200 for foods', async () => {
      const response = await request(app)
        .get('/foods')
        .set('Accept', 'application/json');
      expect(response.status).to.equal(200);
      expect(response.body.error).to.be.undefined;
      expect(response.body.data[0].food_id).to.equal(1);
      expect(response.body.data[1].food_id).to.equal(2);
      expect(response.body.data[2].food_id).to.equal(3);
    });
  });

  describe('GET /foods', () => {
    test('Should return 404 if category is not found', async () => {
      const response = await request(app)
        .get('/foods?category=categoryThatDoesntExist')
        .set('Accept', 'application/json');
      expect(response.status).to.equal(404);
      expect(response.body.error).to.equal(
        'Category: categoryThatDoesntExist does not exist'
      );
    });

    test('Should return 200 and array of food from category', async () => {
      const response = await request(app)
        .get('/foods?category=diet_dishes')
        .set('Accept', 'application/json');

      expect(response.status).to.equal(200);
      expect(response.body.error).to.be.undefined;
      expect(response.body.data[0].food_id).to.equal(1);
      expect(response.body.data[1].food_id).to.equal(2);
      expect(response.body.data[2].food_id).to.equal(3);
      expect(response.body.data[0].name).to.equal('Steamed Mixed Vegetables');
    });
  });
});
