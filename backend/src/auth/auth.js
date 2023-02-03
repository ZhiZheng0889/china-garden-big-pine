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

      console.log('Sending 2FA code: ', message); // Log the message

      transporter.sendMail(message, (error, info) => {
        if (error) {
          return done(error);
        }
        console.log(info); // Log the info object
        if (info.accepted.includes(req.user.email)) {
          console.log(`2FA code sent to ${req.user.email}`); // Check if the email was sent
          return done(null, info);
        } else {
          return done(
            new Error(
              `An error occurred while sending the 2FA code to ${req.user.email}`
            )
          );
        }
      });
    } catch (error) {
      console.error(error);
      return done(new Error('An error occurred while sending the 2FA code'));
    }
  })
);

function send2FACode(req, res, next) {
  passport.authenticate('2fa', async (err, info) => {
    if (err) {
      return next({
        status: 500,
        message: err.message,
      });
    }
    return res
      .status(200)
      .json({ data: { message: '2FA code sent successfully' } });
  })(req, res, next);
}

module.exports = send2FACode;
