const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  role:      { type: String, enum: ["user", "antar"], required: true },
  content:   { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const ConversationSchema = new mongoose.Schema({
  userId:     {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", required: true,
  },
  messages:   [MessageSchema],
  createdAt:  { type: Date, default: Date.now },
  lastActive: { type: Date, default: Date.now },
}, { timestamps: true });

// Auto-delete after 30 days inactivity
ConversationSchema.index(
  { lastActive: 1 },
  { expireAfterSeconds: 30 * 24 * 60 * 60 }
);

module.exports = mongoose.model("Conversation", ConversationSchema);