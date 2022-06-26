const mongoose = require("mongoose");

const NewResetLinkSchema = mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    resetKey: { type: String, required: true },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: process.env.MONGODB_TTL,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("ResetLinks", NewResetLinkSchema, "resetlinks");
