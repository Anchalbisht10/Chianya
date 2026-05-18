const express  = require("express");
const Wisdom   = require("../models/Wisdom");
const { wisdomPersonalized } = require("../services/antarService");
const router   = express.Router();

router.get("/today", async (req, res) => {
  try {
    const feelings = req.query.feelings
      ? req.query.feelings.split(",")
      : [];

    // Same teaching for all users on the same day
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Find today's teaching or pick one
    let wisdom = await Wisdom.findOne({ dateLastShown: { $gte: today } });

    if (!wisdom) {
      // Pick the one least recently shown
      wisdom = await Wisdom.findOne().sort({ dateLastShown: 1 });
      if (!wisdom) return res.status(404).json({ error: "No teachings found." });
      wisdom.dateLastShown = new Date();
      await wisdom.save();
    }

    // Personalized Antar line
    let antarLine = null;
    if (feelings.length > 0) {
      antarLine = await wisdomPersonalized({
        teachingText: wisdom.teachingText,
        feelings,
      });
    }

    res.json({
      wisdom: {
        teachingText: wisdom.teachingText,
        reflection:   wisdom.reflection,
        tag:          wisdom.tag,
      },
      antarLine,
    });
  } catch (err) {
    console.error("Wisdom error:", err.message);
    res.status(500).json({ error: "Could not retrieve today's teaching." });
  }
});

module.exports = router;