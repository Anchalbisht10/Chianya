const mongoose = require("mongoose");

const UserActivitySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", required: true, unique: true,
  },
  antarSessionCount:          { type: Number, default: 0 },
  breathingSessionsCompleted: { type: Number, default: 0 },
  releaseSessionCount:        { type: Number, default: 0 },
  groundSessionCount:         { type: Number, default: 0 },
  wisdomSessionCount:         { type: Number, default: 0 },
  justSitSessionCount:        { type: Number, default: 0 },
  totalVisits:                { type: Number, default: 0 },
  lastVisited:                { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model("UserActivity", UserActivitySchema);