const passport = require('passport');
const nodemailer = require('nodemailer');

require('dotenv');


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password',
  },
});

passport.use('2fa', new passport.Strategy(
  async function (req, done) {
    // Retrieve the user's 2FA secret from the database or file
    const user = await User.findById(req.user.id);
    const secret = user.secret;

    // Send the 2FA code to the user's email
    const message = {
      from: 'your-email@gmail.com',
      to: req.user.email,
      subject: 'Your 2FA code',
      text: `Your 2FA code is: ${secret}`,
    };
    transporter.sendMail(message, (error, info) => {
      if (error) {
        return done(error);
      }
    });

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
