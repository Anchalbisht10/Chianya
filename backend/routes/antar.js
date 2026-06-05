const express      = require("express");
const jwt          = require("jsonwebtoken");
const User         = require("../models/User");
const protect      = require("../middleware/auth");
const Conversation = require("../models/Conversation");
const { antarMessage } = require("../services/antarService");
const router       = express.Router();

// ── Optional auth ─────────────────────────────────────────────
// Guests can talk to Antar freely.
// Logged-in users get their conversation saved and history works.
const optionalAuth = async (req, res, next) => {
  try {
    const token = req.cookies?.chianyaToken;
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id);
    }
  } catch {
    // Token invalid or expired — treat as guest, don't block
  }
  next();
};

// ── Send message to Antar ─────────────────────────────────────
router.post("/message", optionalAuth, async (req, res) => {
  try {
    const { message, feelings, sessionId } = req.body;

    if (!message?.trim())
      return res.status(400).json({ error: "Message is required." });

    const userId = req.user?._id || null;
    let conversation = null;

    // Load or create conversation (logged-in users only)
    if (userId) {
      if (sessionId) {
        conversation = await Conversation.findOne({ _id: sessionId, userId });
      }
      if (!conversation) {
        conversation = await Conversation.create({ userId, messages: [] });
      }
    }

   const history = conversation?.messages || [];

// Get last session summary for returning users
let lastSessionSummary = null;
if (userId) {
  const previousConv = await Conversation.findOne({
    userId,
    _id: { $ne: conversation?._id },
  }).sort({ lastActive: -1 }).select("messages lastActive");

  if (previousConv && previousConv.messages.length > 0) {
    const lastMessages = previousConv.messages.slice(-4);
    lastSessionSummary = lastMessages
      .filter(m => m.role === "antar")
      .map(m => m.content)
      .join(" | ");
  }
}

const reply = await antarMessage({ messages: history, feelings, userMessage: message, lastSessionSummary });
    // Save messages (logged-in users only)
    if (conversation) {
      conversation.messages.push({ role: "user",  content: message });
      conversation.messages.push({ role: "antar", content: reply  });
      conversation.lastActive = new Date();
      await conversation.save();
    }

    res.json({
      reply,
      sessionId: conversation?._id || null,
    });
  } catch (err) {
    console.error("Antar error:", err.message);
    res.status(500).json({ error: "Antar could not respond. Try again." });
  }
});

// ── Get conversation history (logged-in only) ─────────────────
router.get("/history", protect, async (req, res) => {
  try {
    const conversations = await Conversation.find({ userId: req.user._id })
      .sort({ lastActive: -1 })
      .limit(5)
      .select("messages lastActive createdAt");
    res.json({ conversations });
  } catch {
    res.status(500).json({ error: "Could not retrieve history." });
  }
});

module.exports = router;