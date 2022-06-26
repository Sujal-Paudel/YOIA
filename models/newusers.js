const mongoose = require("mongoose");

const NewUserSchema = mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    fullName: { type: String, required: true },
    email: {
      type: String,
      required: true,
      match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    },
    emailKey: { type: String, required: true },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: process.env.MONGODB_TTL,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("NewUsers", NewUserSchema, "newusers");
