const router = require("express").Router();
const mongoose = require("mongoose");
const { ObjectID } = require("mongodb");

const checkAuth = require("../middleware/checkauth");

const { getDataOfItems } = require("../modules/db-validators");
const { generateJWT, isValidNepalPhoneNumber } = require("../modules/functions");
const sendSMS = require("../modules/sendSMS");

const Items = require("../models/items");
const Orders = require("../models/orders");
const Users = require("../models/users");
const Admin = require("../models/admin");
const Config = require("../models/config");

router.post("/login", (req, res) => {
  const { identifier, password } = req.body;

  Admin.findOne({ username: identifier })
    .then((admin) => {
      if (admin && admin.password === password) {
        res
          .cookie(...generateJWT(admin, { userType: "admin" }))
          .status(200)
          .json({
            success: true,
            data: {
              username: admin.username,
              fullName: admin.fullName,
              admin: admin.admin,
            },
          });
      } else {
        res.status(401).json({
          success: false,
          message: "insufficient credentials",
        });
      }
    })
    .catch((e) => {
      console.log(e);
      res.status(500).json({
        success: false,
      });
    });
});

router.post("/items", checkAuth({ userType: "admin" }), (req, res) => {
  const index = req.body.index || 0;
  const limit = req.body.limit || 200;

  Items.find({ published: { $in: true } })
    .skip(index)
    .limit(limit)
    .then((data) => {
      res.status(200).json({ success: true, data });
    });
});

router.put("/items", checkAuth({ userType: "admin" }), (req, res) => {
  const {
    itemCode,
    itemName,
    nepaliItemName,
    image,
    category,
    tags,
    brand,
    inventory,
    rate,
    marketRate,
    minOrder,
    description,
  } = req.body;

  const item = new Items({
    itemCode,
    itemName,
    nepaliItemName,
    image,
    category,
    tags,
    brand,
    inventory,
    rate,
    marketRate,
    minOrder,
    description,
    published: true,
  });

  item.save().then((result) => {
    res.status(201).json({ success: true, data: item });
  });
});

router.patch("/items", checkAuth({ userType: "admin" }), (req, res) => {
  const {
    _id,
    itemCode,
    itemName,
    nepaliItemName,
    image,
    category,
    tags,
    brand,
    inventory,
    rate,
    marketRate,
    minOrder,
    description,
  } = req.body;

  const updateQuery = {};
  itemCode && (updateQuery.itemCode = itemCode);
  itemName && (updateQuery.itemName = itemName);
  nepaliItemName && (updateQuery.nepaliItemName = nepaliItemName);
  image && (updateQuery.image = image);
  category && (updateQuery.category = category);
  tags && (updateQuery.tags = tags);
  brand && (updateQuery.brand = brand);
  inventory && (updateQuery.inventory = inventory);
  rate && (updateQuery.rate = rate);
  marketRate && (updateQuery.marketRate = marketRate);
  minOrder && (updateQuery.minOrder = minOrder);
  description && (updateQuery.description = description);

  Items.updateOne({ _id }, { $set: updateQuery }, { upsert: true }).then((data) => {
    res.status(201).json({ success: true, data });
  });
});

router.delete("/items", checkAuth({ userType: "admin" }), (req, res) => {
  const { _id } = req.body;

  Items.updateOne({ _id }, { $set: { published: false } })
    .exec()
    .then(({ nModified }) => {
      if (nModified) {
        res.status(201).json({ success: true });
      } else {
        res.status(500).end();
      }
    });
});

router.patch("/inventory", checkAuth({ userType: "admin" }), (req, res) => {
  const { _id, inventory } = req.body;

  Items.updateOne({ _id }, { $set: { inventory } })
    .then(() => {
      res.status(201).json({ success: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: "db error",
      });
    });
});

router.post("/orders", checkAuth({ userType: "admin" }), (req, res) => {
  const { from, to, status, username } = req.body;

  const query = {};
  from && (query._id = { $gte: ObjectID.createFromTime(from / 1000) });
  to && (query._id = { $lte: ObjectID.createFromTime(to / 1000) });
  status && (query.status = status);
  username && (query.username = username);

  Orders.find(query)
    .lean()
    .then((doc) => {
      res.status(200).json({ success: true, data: doc });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: "db error",
      });
    });
});

router.put("/orders", checkAuth({ userType: "admin" }), async (req, res) => {
  const { username, status, items, delivery, remarks, discount, extraCharge, payment } =
    req.body;

  const _items = await getDataOfItems(items);
  const _total = _items.reduce((a, e) => a + e.rate * e.quantity, 0);
  const _grandTotal = +_total - +discount + +extraCharge;

  new Orders({
    username,
    status,
    items: _items,
    delivery,
    remarks,
    total: _total,
    discount,
    extraCharge,
    grandTotal: _grandTotal,
    payment,
  })
    .save()
    .then((data) => {
      res.status(201).json({ success: true });
    });
});

router.patch("/orders", checkAuth({ userType: "admin" }), async (req, res) => {
  const { _id, status } = req.body;

  Orders.updateOne({ _id }, { $set: { status } }).then(({ nModified }) => {
    if (nModified) {
      res.status(200).json({ success: true });
    }
  });
});

router.delete("/orders", checkAuth({ userType: "admin" }), (req, res) => {
  const { _id } = req.body;

  Orders.updateOne({ _id }, { $set: { status: "deleted" } })
    .then(() => {
      res.status(201).json({
        success: true,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: "db error",
      });
    });
});

router.post("/display", checkAuth({ userType: "admin" }), (req, res) => {
  const { configName } = req.body;

  Config.findOne({ configName }).then((data) => {
    res.status(200).json({ success: true, data });
  });
});

router.patch("/display", checkAuth({ userType: "admin" }), (req, res) => {
  const { configName, data } = req.body;
  const { bannerImages, featured, bestValue, popular } = data;

  const updateQuery = {};
  bannerImages && (updateQuery.bannerImages = bannerImages);
  featured && (updateQuery.featured = featured);
  bestValue && (updateQuery.bestValue = bestValue);
  popular && (updateQuery.popular = popular);

  Config.collection
    .updateOne({ configName }, { $set: updateQuery })
    .then(({ result }) => {
      if (result.nModified) {
        res.status(201).json({ success: true });
      } else {
        res.status(500).end();
      }
    });
});

router.post("/clients", checkAuth({ userType: "admin" }), (req, res) => {
  // const index = req.body.index || 0;
  // const limit = req.body.limit || 30;

  Users.find()
    // .skip(index)
    // .limit(limit)
    .select("-password -oauthData -createdAt -updatedAt")
    .then((data) => {
      res.status(200).json({ success: true, data });
    });
});

router.put("/clients", checkAuth({ userType: "admin" }), (req, res) => {
  const { fullName, phone, email, address, sendSMS } = req.body;

  if (!isValidNepalPhoneNumber(phone)) return res.json({ error: "INVALID_PHONE" });

  const user = new Users({ username: phone, fullName, phone, email, address, sendSMS });

  user.save().then((result) => {
    res.status(200).json({ success: true, data: result });
  });
});

router.patch("/clients", checkAuth({ userType: "admin" }), (req, res) => {
  const { username, paidUser, sendSMS } = req.body;

  if (typeof sendSMS === "boolean") {
    Users.updateOne({ username }, { $set: { sendSMS } }).then(({ nModified }) => {
      if (nModified) {
        res.status(200).json({ success: true, sendSMS });
      }
    });
  } else if (typeof paidUser === "boolean") {
    Users.updateOne({ username }, { $set: { paidUser, "flags.forceLogout": true } }).then(
      ({ nModified }) => {
        if (nModified) {
          res.status(200).json({ success: true, paidUser });
        }
      }
    );
  }
});

router.put("/sendSMS", checkAuth({ userType: "admin" }), async (req, res) => {
  const { phoneNumberArray, text } = req.body;

  if (global.smsLimitForToday > 100) return res.json({ error: "SMS_LIMIT_TODAY" });
  if (phoneNumberArray.length > 100) {
    return res.json({ error: "NUMBERS_EXCEEDED" });
  }
  for (const phone of phoneNumberArray) {
    if (global.smsLimitForToday > 100) return res.json({ success: true });
    global.smsLimitForToday = global.smsLimitForToday ? global.smsLimitForToday++ : 1;
    await sendSMS(phone, { text });
  }
  return res.json({ success: true });
});

router.get("/logout", (req, res) => {
  res.clearCookie(process.env.PROJECT_NAME, {
    domain: process.env.DOMAIN_NAME,
    secure: JSON.parse(process.env.DEPLOYMENT),
    httpOnly: true,
    sameSite: true,
    path: "/",
  });
  res.status(401).end();
});

module.exports = router;
