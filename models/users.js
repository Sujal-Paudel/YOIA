const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    username: { type: String, required: true, unique: true, match: /^\S*$/ },
    fullName: { type: String, required: true },
    businessName: { type: String },
    email: {
      type: String,
      required: true,
      unique: true,
      match:
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    },
    password: { type: String },
    oauthData: {
      vendor: { type: String },
      id: { type: String },
      displayName: { type: String },
      emails: { type: Array },
      photos: { type: Array },
    },
    phone: { type: String },
    paidUser: { type: Boolean, default: false },
    sendSMS: { type: Boolean, default: true },
    flags: {
      forceLogout: { type: Boolean },
      passwordChange: { type: Boolean },
    },
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

module.exports = mongoose.model("Users", UserSchema, "users");
