const passport = require("passport");
const GoogleStrategy = require("passport-google-0auth20").Strategy;

const googleClientId = process.env.GOOGLE_API_KEY;
const googleClientSecret = process.env.PASSPORT_SECRET;
if (!googleClientId || !googleClientSecret) {
  throw new Error("Invalid api credentials");
}

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new GoogleStrategy({
    clientId: googleClientId,
    clientSecret: googleClientSecret,
    callbackURL: "http://localhost:5000/google/callback",
    passReqToCallback: true,
  }),
  (req, accessToken, refreshToken, profile, done) => {
    return done(null, profile);
  }
);
