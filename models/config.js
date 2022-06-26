const mongoose = require("mongoose");

const ConfigSchema = mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    configName: { type: String },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Config", ConfigSchema, "config");
