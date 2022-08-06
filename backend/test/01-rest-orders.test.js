const { expect } = require('chai');
const request = require('supertest');

const app = require('../src/app');
const knex = require('../src/db/connection');

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

  describe('List order', () => {
    describe('GET /order', () => {
      test('Should return ');
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
