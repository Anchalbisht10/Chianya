const express  = require("express");
const Feedback = require("../models/Feedback");
const router   = express.Router();

router.post("/", async (req, res) => {
  try {
    const { message, feeling, name } = req.body;
    if (!message?.trim())
      return res.status(400).json({ error: "Message is required." });
    if (message.length > 500)
      return res.status(400).json({ error: "Message too long." });

    const feedback = await Feedback.create({
      message: message.trim(),
      feeling: feeling || "",
      name: name?.trim() || "Anonymous",
    });

    res.status(201).json({ success: true, feedback });
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
    await Feedback.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: "Could not delete feedback." });
  }
});

module.exports = router;