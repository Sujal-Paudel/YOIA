const router = require("express").Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");

const checkAuth = require("../middleware/checkauth");
const Users = require("../models/users");
const NewUsers = require("../models/newusers");
const ResetLinks = require("../models/resetlinks");

const {
  sendVerificationMail,
  sendForgotMail,
  emailCodeGenerator,
  resetLinkGenerator,
  generateJWT,
} = require("../modules/functions");

router.put("/preregister", (req, res) => {
  const { fullName, email } = req.body;
  const emailKey = emailCodeGenerator();

  Users.findOne({ email })
    .exec()
    .then((user) => {
      if (user) {
        res.status(200).json({
          message: "email exists",
        });
      } else {
        const newuser = new NewUsers({
          fullName,
          email,
          emailKey,
        });
        newuser
          .save()
          .then(() => {
            sendVerificationMail({
              fullName: newuser.fullName,
              email: newuser.email,
              code: newuser.emailKey,
            })
              .then(() => {
                res.status(201).json({
                  _id: newuser._id,
                  success: true,
                });
              })
              .catch((err) => {
                console.log(err);
                res.status(500).json({
                  error: "error sending email",
                });
              });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({
              error: "error writing to db",
            });
          });
      }
    });
});

router.put("/register", (req, res, next) => {
  let {
    _id,
    username,
    fullName,
    email,
    phone,
    businessName,
    emailKey,
    password,
  } = req.body;

  username = username.toLowerCase();
  username = username.replace(/[^a-z0-9_]/g, "");

  Users.findOne({ $or: [{ email }, { username }] })
    .exec()
    .then((user) => {
      if (user && user.email === email) {
        return res.status(409).json({
          message: "Mail exists",
        });
      } else if (user && user.username === username) {
        return res.status(409).json({
          message: "Username exists",
        });
      } else {
        NewUsers.findById(_id)
          .exec()
          .then((newuser) => {
            if (
              String(newuser._id) === _id &&
              newuser.email === email &&
              newuser.emailKey === emailKey
            ) {
              bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                  return res.status(500).json({
                    error: "error while calculating hash",
                  });
                } else {
                  const user = new Users({
                    username,
                    fullName,
                    email,
                    password: hash,
                    phone,
                    businessName,
                  });
                  user
                    .save()
                    .then((result) => {
                      console.log(result);
                      res.status(201).json({
                        _id: user._id,
                        success: true,
                        message: "User created, you can now login",
                      });
                    })
                    .catch((err) => {
                      console.log(err);
                      res.status(500).json({
                        error: "error while saving to db",
                      });
                    });
                }
              });
            } else {
              res.status(404).json({
                message: "no users in sentmail sandbox",
              });
            }
          });
      }
    });
});

router.post("/login", (req, res) => {
  const { identifier, password } = req.body;

  Users.findOneAndUpdate(
    {
      $or: [
        { email: identifier },
        { username: identifier },
        { phone: identifier },
      ],
    },
    { $set: { "flags.forceLogout": false } }
  )
    .exec()
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: "No Users Found",
        });
      }
      bcrypt.compare(password, user.password, (err, validity) => {
        if (err) {
          return res.status(500).json({
            message: "Error while hash compare",
          });
        }
        if (validity) {
          res
            .cookie(...generateJWT(user, { userType: "user" }))
            .status(200)
            .json({
              success: true,
              data: { fullName: user.fullName, paidUser: user.paidUser },
            });
        } else {
          res.status(401).json({
            message: "insufficient credentials",
          });
        }
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.post("/details", checkAuth({ userType: "user" }), (req, res) => {
  const { username } = req.jwt;

  Users.findOne({ username })
    .select("-password -oauthData")
    .then((doc) => {
      if (doc) {
        res.status(200).json({
          success: true,
          data: doc,
        });
      } else {
        res.status(404).json({
          message: "error",
        });
      }
    });
});

router.patch("/details", checkAuth({ userType: "user" }), (req, res) => {
  const { username } = req.jwt;
  const { fullName, email, phone, businessName } = req.body;

  const updateQuery = {};

  fullName && (updateQuery.fullName = fullName);
  phone && (updateQuery.phone = phone);
  email && (updateQuery.email = email);
  businessName && (updateQuery.businessName = businessName);

  Users.updateOne({ username }, { $set: updateQuery }, { safe: true })
    .then(({ nModified, n }) => {
      if (nModified || n) {
        res.status(201).json({ success: true, data: updateQuery });
      } else {
        res.status(404).json({ message: "No Entries" });
      }
    })
    .catch((e) => res.status(500).end());
});

router.patch("/password", checkAuth({ userType: "user" }), (req, res) => {
  const { username } = req.jwt;
  const { oldPassword, newPassword } = req.body;

  Users.findOne({ username }).then((user) => {
    if (!user || !user.password) return res.status(404).end();

    bcrypt.compare(oldPassword, user.password, (err, result) => {
      if (err) {
        return res.status(401).json({
          message: "Error while hash compare",
        });
      }
      if (result) {
        bcrypt.hash(newPassword, 3, (err, hash) => {
          if (err) {
            return res.status(500).end();
          } else {
            Users.updateOne(
              { username },
              { $set: { password: hash } },
              { safe: true }
            ).then(({ nModified }) => {
              if (nModified) {
                res.status(201).json({
                  success: true,
                });
              }
            });
          }
        });
      } else {
        res.status(404).end();
      }
    });
  });
});

router.put("/forgot", (req, res) => {
  const { username, email, fullName } = req.body;

  Users.findOne({
    $and: [{ username, email, password: { $exists: true } }],
  }).then((result) => {
    if (result) {
      const user = new ResetLinks({
        username,
        email,
        resetKey: resetLinkGenerator(),
      });
      sendForgotMail(fullName, user.email, user.resetKey)
        .then(() => {
          user.save().then(() => {
            res.status(201).json({
              success: true,
              message: "reset link sent",
            });
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({
            message: "error while sending mail",
          });
        });
    } else {
      res.status(404).json({
        message: "username or email doesn't exist",
      });
    }
  });
});

router.patch("/resetpassword", (req, res) => {
  const { resetKey, password } = req.body;

  ResetLinks.findOne({ resetKey }).then((result) => {
    if (!result) return res.status(404).end();

    Users.findOne({ username: result.username }).then((user) => {
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          return res.status(500).end();
        } else {
          user
            .update({ $set: { password: hash } }, { safe: true })
            .then(({ nModified }) => {
              if (nModified) {
                res.status(201).json({
                  success: true,
                  message: "password changed",
                });
              }
            });
        }
      });
    });
  });
});

router.get("/logout", (req, res) => {
  res.clearCookie(process.env.PROJECT_NAME, {
    domain: process.env.DOMAIN_NAME,
    secure: JSON.parse(process.env.DEPLOYMENT),
    httpOnly: true,
    sameSite: true,
    path: "/",
  });
  res.redirect("/");
});

module.exports = router;
