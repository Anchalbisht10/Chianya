const express = require("express");
const StarRating = require("../models/StarRating");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { stars, message, emoji, name } = req.body;
    if (!stars || stars < 1 || stars > 5)
      return res.status(400).json({ error: "Stars required (1-5)." });

    const rating = await StarRating.create({
      stars, message: message?.trim() || "",
      emoji: emoji || "🌿",
      name: name?.trim() || "Anonymous",
    });
    res.status(201).json({ success: true, rating });
  } catch (err) {
    res.status(500).json({ error: "Could not save rating." });
  }
});

router.get("/", async (req, res) => {
  try {
    const ratings = await StarRating.find()
      .sort({ stars: -1, createdAt: -1 })
      .limit(50);
    const avg = ratings.length
      ? (ratings.reduce((s, r) => s + r.stars, 0) / ratings.length).toFixed(1)
      : 0;
    res.json({ ratings, average: avg, total: ratings.length });
  } catch {
    res.status(500).json({ error: "Could not fetch ratings." });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await StarRating.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: "Could not delete." });
  }
});

module.exports = router;