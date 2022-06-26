const mongoose = require("mongoose");

const AdminSchema = mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    username: { type: String, required: true, unique: true },
    fullName: { type: String },
    password: { type: String, required: true },
    access: { type: Array, required: true },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Admin", AdminSchema, "admin");
