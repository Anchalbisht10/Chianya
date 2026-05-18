const express      = require("express");
const protect      = require("../middleware/auth");
const UserActivity = require("../models/UserActivity");
const {
  justSitClosing,
  breatheClosing,
  groundClosing,
  releaseOpening,
} = require("../services/antarService");
const router = express.Router();

const VALID_MODES = [
  "antar", "breathing", "release",
  "ground", "wisdom", "justSit",
];

// Log a session + get closing Antar line
router.post("/session", protect, async (req, res) => {
  try {
    const { mode, feelings, meta } = req.body;

    if (!VALID_MODES.includes(mode))
      return res.status(400).json({ error: "Invalid mode." });

    const fieldMap = {
      antar:    "antarSessionCount",
      breathing:"breathingSessionsCompleted",
      release:  "releaseSessionCount",
      ground:   "groundSessionCount",
      wisdom:   "wisdomSessionCount",
      justSit:  "justSitSessionCount",
    };

    await UserActivity.findOneAndUpdate(
      { userId: req.user._id },
      {
        $inc: { [fieldMap[mode]]: 1 },
        lastVisited: new Date(),
      },
      { upsert: true }
    );

    // Generate closing Antar line where applicable
    let antarLine = null;
    const f = feelings || [];

    if (mode === "justSit" && meta?.durationSeconds) {
      antarLine = await justSitClosing({ durationSeconds: meta.durationSeconds, feelings: f });
    } else if (mode === "breathing" && meta?.cycles) {
      antarLine = await breatheClosing({ cycles: meta.cycles, feelings: f });
    } else if (mode === "ground") {
      antarLine = await groundClosing({ feelings: f });
    }

    res.json({ logged: true, antarLine });
  } catch (err) {
    console.error("Activity error:", err.message);
    res.status(500).json({ error: "Could not log session." });
  }
});

// Get user's sanctuary stats
router.get("/mine", protect, async (req, res) => {
  try {
    const activity = await UserActivity.findOne({ userId: req.user._id });
    if (!activity)
      return res.json({ activity: null });

    res.json({
      activity: {
        antarSessionCount:          activity.antarSessionCount,
        breathingSessionsCompleted: activity.breathingSessionsCompleted,
        releaseSessionCount:        activity.releaseSessionCount,
        groundSessionCount:         activity.groundSessionCount,
        wisdomSessionCount:         activity.wisdomSessionCount,
        justSitSessionCount:        activity.justSitSessionCount,
        totalVisits:                activity.totalVisits,
        lastVisited:                activity.lastVisited,
        joinedDate:                 req.user.joinedDate,
        firstName:                  req.user.firstName,
      },
    });
  } catch {
    res.status(500).json({ error: "Could not retrieve activity." });
  }
});

// Release opening line (called when user enters Release mode)
router.post("/release-opening", protect, async (req, res) => {
  try {
    const { feelings } = req.body;
    const line = await releaseOpening({ feelings: feelings || [] });
    res.json({ antarLine: line });
  } catch {
    res.status(500).json({ error: "Could not generate opening." });
  }
});

module.exports = router;