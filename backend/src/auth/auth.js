const bcrypt = require('bcryptjs');
const validator = require('validator');
const nodemailer = require('nodemailer');
const passport = require('passport');
require('dotenv');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ztmdummy33782@gmail.com',
    pass: 'Wy8T3VJ6R_Ut_3c',
  },
});

passport.use(
  '2fa',
  new passport.Strategy(async function (req, done) {
    try {
      // Retrieve the user's 2FA secret from the database or file
      const user = await User.findById(req.user.id);
      if (!user) return done(new Error('User not found'));
      const secret = user.secret;
      const hashedSecret = await bcrypt.hash(secret, 10);

      await User.updateOne({ _id: req.user.id }, { secret: hashedSecret });

      // Send the 2FA code to the user's email
      const message = {
        from: 'ztmdummy33782@gmail.com',
        to: req.user.email,
        subject: 'Your 2FA code',
        text: `Your 2FA code is: ${secret}`,
      };
      transporter.sendMail(message, (error, info) => {
        if (error) {
          return done(error);
        }
      });
    } catch (error) {
      console.error(error);
      return done(new Error('An error occurred while sending the 2FA code'));
    }
  })
);

/**
const assert = require('assert');
const passport = require('passport');

describe('2FA Passport Strategy', function () {
    it('should hash the secret and send an email with the 2FA code', function () {
        // Create a test user with a known secret
        const testUser = {
            id: '123',
            email: 'test@example.com',
            secret: 'testsecret'
        };

        // Pass the test user to the passport strategy
        passport.use(
            '2fa',
            new passport.Strategy(async function (req, done) {
                req.user = testUser;
                // Call the passport strategy
                await require('path/to/script')(req, done);
            })
        );

        // Assert that the user's secret is hashed and an email is sent
        assert.strictEqual(testUser.secret, hashedSecret);
        assert.strictEqual(info.accepted[0], testUser.email);
    });
});
 */