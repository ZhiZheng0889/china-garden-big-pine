const { expect } = require('chai');
const request = require('supertest');
const app = require('../src/app');
const knex = require('../src/db/connection');
const assert = require('assert');
const passport = require('passport');
const auth = require('auth\auth.js');

describe('2FA Passport Strategy', function () {
    it('should hash the secret and send an email with the 2FA code', function () {
        // Create a test user with a known secret
        const testUser = {
            id: '123',
            email: 'zhizheng33782@gmail.com',
            secret: 'testsecret'
        };

        // Pass the test user to the passport strategy
        passport.use(
            '2fa',
            new passport.Strategy(async function (req, done) {
                req.user = testUser;
                // Call the passport strategy
                await auth.twoFactorAuth(req, done);
            })
        );

        // Assert that the user's secret is hashed and an email is sent
        assert.strictEqual(testUser.secret, hashedSecret);
        assert.strictEqual(info.accepted[0], testUser.email);
    });
});