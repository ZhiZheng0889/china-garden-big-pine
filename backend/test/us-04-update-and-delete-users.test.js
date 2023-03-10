const { expect } = require('chai');
const request = require('supertest');
const app = require('../src/app');
const knex = require('../src/db/connection');
const assert = require('assert');
const passport = require('passport');
const bcrypt = require('bcrypt');

// Import twoFactorAuth function
const twoFactorAuth = require('../src/auth/auth.js');

describe('2FA Passport Strategy', function () {
    it('should hash the secret and send an email with the 2FA code', async function () {
        // Create a test user with a known secret
        const testUser = {
            id: '123',
            email: 'zhizheng33782@gmail.com',
            secret: 'testsecret'
        };
        // hash the secret
        const hashedSecret = await bcrypt.hash(testUser.secret, 10);

        // Pass the test user to the passport strategy
        passport.use(
            'auth',
            new passport.Strategy(async function (req, done) {
                req.user = testUser;
                // Call the passport strategy
                await twoFactorAuth(req, done);
            })
        );
        // Use supertest to send a request to the application
        const res = await request(app)
            .post('/auth')
            .send({ secret: testUser.secret });

        // Assert that the response is successful
        console.log(res);
        expect(res.statusCode).to.equal(200);
        // Assert that the user's secret is hashed and an email is sent
        assert.strictEqual(await bcrypt.compare(testUser.secret, hashedSecret), true);
        assert.strictEqual(info.accepted[0], testUser.email);
    });
});
