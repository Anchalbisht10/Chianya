const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema({
  message: { type: String, required: true, maxlength: 500 },
  feeling: { type: String, default: "" },
  name: { type: String, default: "Anonymous" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Feedback", FeedbackSchema);