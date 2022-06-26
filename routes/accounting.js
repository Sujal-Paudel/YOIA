const router = require("express").Router();
const mongoose = require("mongoose");

const Ledger = require("../models/ledger");
const DebitCredit = require("../models/debitcredit");

router.post("/ledger", (req, res) => {
  const { username } = req.jwt;

  Ledger.findOne({ username }).then((result) => {
    res.status(200).json({ success: true, data: result });
  });
});

router.put("/ledger", (req, res) => {
  const { username } = req.jwt;
  const {
    date,
    saleAmount,
    withdrawAmount,
    loanAmount,
    profitAmount,
    totalAmount,
  } = req.body;

  const entries = {
    _id: mongoose.Types.ObjectId(),
    date,
    saleAmount,
    withdrawAmount,
    loanAmount,
    profitAmount,
    totalAmount,
  };

  Ledger.updateOne({ username }, { $push: { entries } }, { upsert: true }).then(
    ({ nModified, upserted }) => {
      if (nModified || upserted) {
        res.status(201).json({ success: true, data: entries });
      }
    }
  );
});

router.delete("/ledger", (req, res) => {
  const { username } = req.jwt;
  const { _id } = req.body;

  Ledger.updateOne({ username }, { $pull: { entries: { _id } } }).then(
    ({ nModified }) => {
      if (nModified) {
        res.status(201).json({ success: true, data: _id });
      }
    }
  );
});

router.post("/debitcredit", (req, res) => {
  const { username } = req.jwt;
  const { accountType } = req.body;

  DebitCredit.find({
    $and: [{ username, accountType: { $in: accountType } }],
  }).then((result) => {
    res.status(200).json({ success: true, data: result });
  });
});

router.put("/debitcredit", (req, res) => {
  const { username } = req.jwt;
  const { accountType, date, partyName, items, total, notes } = req.body;

  const entries = {
    _id: mongoose.Types.ObjectId(),
    date,
    partyName,
    items,
    total,
    notes,
  };

  DebitCredit.updateOne(
    { $and: [{ username, accountType }] },
    { $push: { entries } },
    { upsert: true }
  ).then(({ nModified, upserted }) => {
    if (nModified || upserted) {
      res.status(201).json({ success: true, data: entries });
    }
  });
});

router.delete("/debitcredit", (req, res) => {
  const { username } = req.jwt;
  const { _id, accountType } = req.body;

  DebitCredit.updateOne(
    { $and: [{ username, accountType }] },
    { $pull: { entries: { _id } } }
  ).then(({ nModified }) => {
    if (nModified) {
      res.status(201).json({ success: true, data: _id });
    }
  });
});

module.exports = router;
