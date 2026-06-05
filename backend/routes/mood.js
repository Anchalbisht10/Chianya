const express   = require("express");
const MoodEntry = require("../models/MoodEntry");
const jwt       = require("jsonwebtoken");
const User      = require("../models/User");
const router    = express.Router();

const optionalAuth = async (req, res, next) => {
  try {
    const token = req.cookies?.chianyaToken;
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id);
    }
  } catch {}
  next();
};

// Log a mood entry
router.post("/", optionalAuth, async (req, res) => {
  try {
    const { feeling } = req.body;
    if (!feeling) return res.status(400).json({ error: "Feeling required." });

    await MoodEntry.create({
      userId: req.user?._id || null,
      feeling,
    });

    res.status(201).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Could not save mood." });
  }
});

// Get last 7 days mood entries for logged in user
router.get("/timeline", optionalAuth, async (req, res) => {
  try {
    if (!req.user) return res.json({ entries: [] });

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const entries = await MoodEntry.find({
      userId: req.user._id,
      createdAt: { $gte: sevenDaysAgo },
    }).sort({ createdAt: 1 });

    res.json({ entries });
  } catch {
    res.status(500).json({ error: "Could not fetch timeline." });
  }
});

module.exports = router;