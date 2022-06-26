const mongoose = require("mongoose");

const ItemSchema = mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    itemCode: { type: String, unique: true },
    itemName: { type: String, text: true },
    nepaliItemName: { type: String },
    image: { type: Array },
    category: { type: String },
    brand: { type: String },
    tags: { type: Array },
    inventory: { type: Number },
    rate: { type: Number },
    marketRate: { type: Number },
    minOrder: { type: Number },
    description: { type: String, text: true },
    published: { type: Boolean },
    // flags: {},
  },
  { versionKey: false }
);

module.exports = mongoose.model("Items", ItemSchema, "items");
