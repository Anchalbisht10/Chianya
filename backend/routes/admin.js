const express      = require("express");
const User         = require("../models/User");
const UserActivity = require("../models/UserActivity");
const MoodEntry    = require("../models/MoodEntry");
const StarRating   = require("../models/StarRating");
const FutureLetter = require("../models/FutureLetter");
const Conversation = require("../models/Conversation");
const router       = express.Router();

// Simple admin key check
const adminAuth = (req, res, next) => {
  const key = req.headers["x-admin-key"];
  if (key !== process.env.ADMIN_KEY) {
    return res.status(403).json({ error: "Not authorized." });
  }
  next();
};

router.get("/overview", adminAuth, async (req, res) => {
  try {
    const [
      users,
      activities,
      moodEntries,
      ratings,
      letters,
      conversations,
    ] = await Promise.all([
      User.find().select("firstName email joinedDate").sort({ joinedDate: -1 }),
      UserActivity.find(),
      MoodEntry.find().sort({ createdAt: -1 }).limit(50),
      StarRating.find().sort({ createdAt: -1 }),
      FutureLetter.find().select("email deliverOn delivered createdAt"),
      Conversation.find().select("userId lastActive messages"),
    ]);

    const totalSessions = activities.reduce((sum, a) => sum +
      (a.antarSessionCount || 0) +
      (a.breathingSessionsCompleted || 0) +
      (a.releaseSessionCount || 0) +
      (a.groundSessionCount || 0) +
      (a.wisdomSessionCount || 0) +
      (a.justSitSessionCount || 0), 0);

    const moodCounts = {};
    moodEntries.forEach(e => {
      moodCounts[e.feeling] = (moodCounts[e.feeling] || 0) + 1;
    });

    const avgRating = ratings.length
      ? (ratings.reduce((s, r) => s + r.stars, 0) / ratings.length).toFixed(1)
      : 0;

    res.json({
      users,
      totalUsers: users.length,
      totalSessions,
      totalMoodEntries: moodEntries.length,
      recentMoods: moodEntries.slice(0, 20),
      moodCounts,
      ratings,
      avgRating,
      totalRatings: ratings.length,
      letters: {
        total: letters.length,
        delivered: letters.filter(l => l.delivered).length,
        pending: letters.filter(l => !l.delivered).length,
      },
      totalConversations: conversations.length,
      activities,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;