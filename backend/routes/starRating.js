const express     = require("express");
const crypto      = require("crypto");
const StarRating  = require("../models/StarRating");
const router      = express.Router();

function hashToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

router.post("/", async (req, res) => {
  try {
    const { stars, message, emoji, name } = req.body;
    if (!stars || stars < 1 || stars > 5)
      return res.status(400).json({ error: "Stars required (1-5)." });

    const ownerToken = crypto.randomBytes(32).toString("hex");

    const rating = await StarRating.create({
      stars, message: message?.trim() || "",
      emoji: emoji || "🌿",
      name: name?.trim() || "Anonymous",
      ownerTokenHash: hashToken(ownerToken),
    });

    const result = rating.toObject();
    delete result.ownerTokenHash;

    res.status(201).json({ success: true, rating: result, ownerToken });
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
    const { ownerToken } = req.body;
    if (!ownerToken || typeof ownerToken !== "string")
      return res.status(400).json({ error: "Owner token required." });

    const doc = await StarRating.findById(req.params.id).select("+ownerTokenHash");
    if (!doc)
      return res.status(404).json({ error: "Not found." });

    if (doc.ownerTokenHash !== hashToken(ownerToken))
      return res.status(403).json({ error: "Not authorized." });

    await doc.deleteOne();
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: "Could not delete." });
  }
});

module.exports = router;