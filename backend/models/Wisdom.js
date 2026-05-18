const mongoose = require("mongoose");

const WisdomSchema = new mongoose.Schema({
  teachingText: { type: String, required: true },
  reflection:   { type: String, required: true },
  tag:          { type: String, required: true },
  dateLastShown:{ type: Date,   default: null },
}, { timestamps: true });

module.exports = mongoose.model("Wisdom", WisdomSchema);