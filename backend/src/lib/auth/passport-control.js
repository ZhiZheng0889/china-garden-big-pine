const passport = require("passport");
const Strategy = require("passport-local").Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("No JWT Secret has been provided");
}
const User = require("../../db/models/userModel");

const cookieExtractor = function (req) {
  let token = null;
  if (req && req.cookies) {
    const { access_token = "" } = req.cookies;
    token = access_token;
  }
  return token;
};

// Local Strategy
passport.use(
  new Strategy((email, password, done) => {
    User.findOne({ email }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, {
          message: "No user found.",
        });
      }

      user
        .login(password)
        .then(() => {
          return done(null, user);
        })
        .catch((err) => {
          return done(err, false, {
            message: "Invalid password",
          });
        });
    });
  })
);

// JWT
passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: JWT_SECRET,
    },
    (jwt_payload, done) => {
      User.findById(jwt_payload.user_id)
        .then((user) => {
          return done(null, user);
        })
        .catch((err) => {
          return done(err, false, {
            message: "Token does not match.",
          });
        });
    }
  )
);
module.exports = passport;
