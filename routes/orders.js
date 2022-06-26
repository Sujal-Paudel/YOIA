const router = require("express").Router();

const checkAuth = require("../middleware/checkauth");
const { getDataOfItems } = require("../modules/db-validators");
const Orders = require("../models/orders");

router.post("/", checkAuth({ userType: "user" }), (req, res) => {
  const { username } = req.jwt;
  const { status, orderFor } = req.body;

  const query = { $and: [{ username }] };
  status && query.$and.push({ status: { $in: status } });
  orderFor && query.$and.push({ orderFor: { $in: orderFor } });
  query.$and.push({ "flags.deleted": { $nin: true } });

  Orders.find(query)
    .select("-flags")
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

router.put("/", checkAuth({ userType: "user" }), async (req, res) => {
  const { username } = req.jwt;
  const { items, delivery, details } = req.body;

  const _items = await getDataOfItems(items);
  const _total = _items.reduce((a, e) => a + e.rate * e.quantity, 0);

  const order = new Orders({
    username,
    status: "pending",
    items: _items,
    delivery: { condition: delivery.condition, address: delivery.address },
    details,
    total: _total,
    grandTotal: _total,
  });

  await order.save().then((result) => {
    req.app.io.emit("NEW_ORDER", order);
    res.status(201).json({ success: true, data: order });
  });
});

router.put("/new", async (req, res) => {
  const { items, delivery, details, newUserDetails } = req.body;

  const _items = await getDataOfItems(items);
  const _total = _items.reduce((a, e) => a + e.rate * e.quantity, 0);

  const order = new Orders({
    username: "<new>",
    status: "pending",
    items: _items,
    delivery: { condition: delivery.condition, address: delivery.address },
    details,
    newUserDetails,
    total: _total,
    grandTotal: _total,
  });

  await order.save().then((result) => {
    res.status(201).json({ success: true, data: order });
  });
});

router.patch("/", checkAuth({ userType: "user" }), async (req, res) => {
  const { username } = req.jwt;
  const { _id, items, delivery, details } = req.body;

  const _items = await getDataOfItems(items);
  const _total = _items.reduce((a, e) => a + e.rate * e.quantity, 0);

  const updateQuery = {};
  items && (updateQuery.items = _items);
  delivery.condition &&
    (updateQuery["delivery.condition"] = delivery.condition);
  delivery.address && (updateQuery["delivery.address"] = delivery.address);
  details && (updateQuery.details = details);
  updateQuery.total = _total;
  updateQuery.grandTotal = _total;

  Orders.updateOne(
    { $and: [{ _id }, { username }, { status: "pending" }] },
    { $set: updateQuery }
  )
    .then(({ nModified, n }) => {
      if (nModified || n) {
        res.status(201).json({ success: true, data: updateQuery });
      } else {
        res.status(404).json({ message: "No Entries" });
      }
    })
    .catch((e) => res.status(500).end());
});

router.delete("/", checkAuth({ userType: "user" }), (req, res) => {
  const { username } = req.jwt;
  const { _id } = req.body;

  Orders.updateOne(
    { $and: [{ _id }, { username }, { status: "pending" }] },
    { $set: { "flags.deleted": true } }
  )
    .exec()
    .then(({ nModified }) => {
      if (nModified) {
        res.status(201).json({ success: true });
      } else {
        res.status(404).json({ message: "Not Found" });
      }
    });
});

module.exports = router;
