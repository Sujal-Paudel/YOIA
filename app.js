const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const passport = require("passport");

const passportInit = require("./modules/passport.init");

const checkAuth = require("./middleware/checkauth");

const usersRoute = require("./routes/users");
const oauthRoute = require("./routes/oauth");
const itemsRoute = require("./routes/items");
const ordersRoute = require("./routes/orders");
const searchRoute = require("./routes/search");
const accountingRoute = require("./routes/accounting");
const uploadsRoute = require("./routes/uploads");

const adminRoute = require("./routes/admin");

const app = express();

mongoose.set("useNewUrlParser", true);
mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useUnifiedTopology", true);

mongoose.connect(process.env.MONGO_URL, (err) => {
  if (!err) console.log("mongodb connected");
});

app.use(express.json({ limit: "1mb" }));

app.use(function (req, res, next) {
  if (process.env.DEPLOYMENT === "false") {
    console.log("\x1b[32m", req.body, "\x1b[0m");

    const json = app.response.json;
    res.json = function (obj) {
      console.log("\x1b[34m", obj, "\x1b[0m");
      json.call(this, obj);
    };
  }
  next();
});

//morgan
app.use(morgan("dev"));

//passport
app.use(passport.initialize());
passportInit();

//routes
app.use("/api/v1/users", usersRoute);
app.use("/api/v1/oauth", oauthRoute);
app.use("/api/v1/items", itemsRoute);
app.use("/api/v1/orders", ordersRoute);
app.use("/api/v1/search", searchRoute);
app.use(
  "/api/v1/accounting",
  checkAuth({ userType: "user", jwtFields: { paidUser: true } }),
  accountingRoute
);
app.use("/api/v1/uploads", uploadsRoute);

app.use("/api/v1/admin", adminRoute);

app.use(express.static("./public"));

module.exports = app;
