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
