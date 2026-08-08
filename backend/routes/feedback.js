const express  = require("express");
const crypto   = require("crypto");
const Feedback = require("../models/Feedback");
const router   = express.Router();

function hashToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

router.post("/", async (req, res) => {
  try {
    const { message, feeling, name } = req.body;
    if (!message?.trim())
      return res.status(400).json({ error: "Message is required." });
    if (message.length > 500)
      return res.status(400).json({ error: "Message too long." });

    const ownerToken = crypto.randomBytes(32).toString("hex");

    const feedback = await Feedback.create({
      message: message.trim(),
      feeling: feeling || "",
      name: name?.trim() || "Anonymous",
      ownerTokenHash: hashToken(ownerToken),
    });

    const result = feedback.toObject();
    delete result.ownerTokenHash;

    res.status(201).json({ success: true, feedback: result, ownerToken });
  } catch (err) {
    res.status(500).json({ error: "Could not save feedback." });
  }
});

router.get("/", async (req, res) => {
  try {
    const feedbacks = await Feedback.find()
      .sort({ createdAt: -1 })
      .limit(50);
    res.json({ feedbacks });
  } catch {
    res.status(500).json({ error: "Could not retrieve feedback." });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { ownerToken } = req.body;
    if (!ownerToken || typeof ownerToken !== "string")
      return res.status(400).json({ error: "Owner token required." });

    const doc = await Feedback.findById(req.params.id).select("+ownerTokenHash");
    if (!doc)
      return res.status(404).json({ error: "Not found." });

    if (doc.ownerTokenHash !== hashToken(ownerToken))
      return res.status(403).json({ error: "Not authorized." });

    await doc.deleteOne();
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: "Could not delete feedback." });
  }
});

module.exports = router;