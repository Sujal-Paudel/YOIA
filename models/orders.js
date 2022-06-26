const mongoose = require("mongoose");

const itemSchema = mongoose.Schema(
  {
    itemCode: { type: String },
    itemName: { type: String },
    quantity: { type: Number },
    rate: { type: Number },
  },
  { _id: false }
);

const OrderSchema = mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    username: { type: String },
    status: { type: String },
    items: [itemSchema],
    delivery: {
      condition: { type: String },
      address: { type: String },
      charge: { type: Number },
    },
    details: { type: String }, // for user
    remarks: { type: String }, // for admin
    total: { type: Number },
    discount: { type: Number },
    extraCharge: { type: Number },
    grandTotal: { type: Number },
    payment: {
      paid: { type: Boolean },
      method: { type: String },
      detail: { type: String },
    },
    newUserDetails: {
      fullName: { type: String },
      businessName: { type: String },
      phone: { type: String },
      email: { type: String },
    },
    flags: {
      manualEntry: { type: Boolean },
      claimed: { type: Boolean },
      deleted: { type: Boolean },
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Orders", OrderSchema, "orders");
