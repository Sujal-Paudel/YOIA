const mongoose = require("mongoose");

const entriesArray = mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  date: { type: Date },
  partyName: { type: String },
  items: { type: Array },
  total: { type: Number },
  notes: { type: String },
});

const DebitCreditSchema = mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    username: { type: String },
    accountType: { type: String }, // debit || credit
    entries: [entriesArray],
  },
  { versionKey: false }
);

module.exports = mongoose.model(
  "DebitCredit",
  DebitCreditSchema,
  "debitcredit"
);
