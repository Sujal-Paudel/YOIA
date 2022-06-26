const router = require("express").Router();
const Items = require("../models/items");

router.post("/", (req, res) => {
  const { query } = req.body;

  Items.find({
    $and: [{ $text: { $search: query } }, { published: true }],
  }).then((result) => {
    res.status(200).json({ success: true, data: result });
  });
});

module.exports = router;
