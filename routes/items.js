const router = require("express").Router();

const checkAuth = require("../middleware/checkauth");

const Items = require("../models/items");
const Config = require("../models/config");

router.post("/", (req, res) => {
  const index = req.body.index || 0;
  const limit = 200;

  Items.find({ published: true })
    .skip(index)
    .limit(limit)
    .then((items) => {
      Config.findOne({ configName: "itemsDisplay" }).then((display) => {
        res.status(200).json({ success: true, data: { items, display } });
      });
    });
});

module.exports = router;
