// auth.js

const passport = require('passport');
const { TOTPStrategy } = require('passport-totp');

passport.use('2fa', new TOTPStrategy(
  function (user, done) {
    // Retrieve the user's 2FA secret from the database or file
    const secret = user.secret;
    return done(null, secret);
  },
  function (user, secret, done) {
    // Prompt the user to enter their 2FA code
    const code = prompt('Enter your 2FA code:');

    // Verify the code by comparing it to the secret
    if (code === secret) {
      return done(null, user);
    } else {
      return done(new Error('Invalid 2FA code'));
    }
  }
));

module.exports = passport;
