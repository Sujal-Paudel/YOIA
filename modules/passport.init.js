const passport = require("passport");
const { Strategy: FacebookStrategy } = require("passport-facebook");
const { OAuth2Strategy: GoogleStrategy } = require("passport-google-oauth");

module.exports = () => {
  passport.use(
    new FacebookStrategy(
      {
        clientID: 123,
        clientSecret: 123,
        callbackURL: `${process.env.PROJECT_URL}/api/v1/oauth/facebook/redirect`,
        profileFields: ["id", "displayName", "emails", "photos"]
      },
      (accessToken, refreshToken, profile, done) => {
        done(null, profile);
      }
    )
  );
  passport.use(
    new GoogleStrategy(
      {
        clientID:123,
        clientSecret: 123,
        callbackURL: `${process.env.PROJECT_URL}/api/v1/oauth/google/redirect`
      },
      (accessToken, refreshToken, profile, done) => {
        done(null, profile);
      }
    )
  );
};
