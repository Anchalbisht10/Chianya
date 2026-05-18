const express  = require("express");
const protect  = require("../middleware/auth");
const UserActivity = require("../models/UserActivity");
const router   = express.Router();

// Content is intentionally never stored.
// This is a design decision, not an oversight.
router.post("/", async (req, res) => {
  try {
    // req.body.content is received and immediately discarded.
    // No database write. No log write. No temporary storage.
    // Only the count increments.

    if (req.user) {
      await UserActivity.findOneAndUpdate(
        { userId: req.user._id },
        { $inc: { releaseSessionCount: 1 } },
        { upsert: true }
      );
    }

    res.json({ released: true });
  } catch {
    res.json({ released: true });
  }
});

module.exports = router;