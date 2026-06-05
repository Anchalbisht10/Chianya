const mongoose = require("mongoose");

const StarRatingSchema = new mongoose.Schema({
  stars: { type: Number, required: true, min: 1, max: 5 },
  message: { type: String, default: "", maxlength: 300 },
  emoji: { type: String, default: "🌿" },
  name: { type: String, default: "Anonymous" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("StarRating", StarRatingSchema);