const router = require("express").Router();
const passport = require("passport");

const Users = require("../models/users");
const constants = require("../modules/constants");

const { generateJWT } = require("../modules/functions");

const facebookAuth = passport.authenticate("facebook", {
  scope: ["email"],
  session: false,
});
const googleAuth = passport.authenticate("google", {
  scope: ["profile", "email"],
  session: false,
});

router.get("/facebook", facebookAuth);
router.get("/google", googleAuth);

router.get("/facebook/redirect", facebookAuth, (req, res) => {
  const profile = req.user;
  const email = profile.emails[0].value;

  Users.findOneAndUpdate(
    {
      $or: [
        {
          email,
        },
        {
          $and: [
            { "oauthData.vendor": "facebook", "oauthData.id": profile.id },
          ],
        },
      ],
    },
    { $set: { "flags.forceLogout": false } }
  ).then((user) => {
    if (user) {
      res
        .cookie(...generateJWT(user, { userType: "user" }))
        .redirect("/account");
    } else {
      new Users({
        username: email.split("@")[0],
        fullName: profile.displayName,
        email,
        oauthData: {
          vendor: "facebook",
          id: profile.id,
          displayName: profile.displayName,
          emails: profile.emails,
          photos: profile.photos,
        },
      })
        .save()
        .then((user) => {
          res
            .cookie(...generateJWT(user, { userType: "user" }))
            .redirect("/account");
        })
        .catch((e) => {
          if (e.code === constants.ERR_MONGO_DUPLICATE_KEY) {
            res.redirect("/login?email_exists");
          }
        });
    }
  });
});

router.get("/google/redirect", googleAuth, (req, res) => {
  const profile = req.user;
  const email = profile.emails[0].value;

  Users.findOneAndUpdate(
    {
      $or: [
        {
          email,
        },
        {
          $and: [{ "oauthData.vendor": "google", "oauthData.id": profile.id }],
        },
      ],
    },
    { $set: { "flags.forceLogout": false } }
  ).then((user) => {
    if (user) {
      res
        .cookie(...generateJWT(user, { userType: "user" }))
        .redirect("/account");
    } else {
      new Users({
        username: email.split("@")[0],
        fullName: profile.displayName,
        email,
        oauthData: {
          vendor: "google",
          id: profile.id,
          displayName: profile.displayName,
          emails: profile.emails,
          photos: profile.photos,
        },
      })
        .save()
        .then((user) => {
          res
            .cookie(...generateJWT(user, { userType: "user" }))
            .status(201)
            .redirect("/account");
        })
        .catch((e) => {
          console.log(e);
          if (e.code === constants.ERR_MONGO_DUPLICATE_KEY) {
            res.redirect("/login?email_exists");
          }
        });
    }
  });
});

module.exports = router;
