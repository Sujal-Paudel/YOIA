const mongoose = require("mongoose");

const entriesArray = mongoose.Schema({
  date: { type: Date },
  saleAmount: { type: Number },
  withdrawAmount: { type: Number },
  loanAmount: { type: Number },
  profitAmount: { type: Number },
  totalAmount: { type: Number },
});

const LedgerSchema = mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    username: { type: String },
    entries: [entriesArray],
  },
  { versionKey: false }
);

module.exports = mongoose.model("Ledger", LedgerSchema, "ledger");
