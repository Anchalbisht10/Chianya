const express       = require("express");
const FutureLetter  = require("../models/FutureLetter");
const router        = express.Router();

router.post("/", async (req, res) => {
  try {
    const { email, letter, days } = req.body;
    if (!email || !letter || !days)
      return res.status(400).json({ error: "All fields required." });
    if (letter.length > 2000)
      return res.status(400).json({ error: "Letter too long." });

    // const deliverOn = new Date();
    // deliverOn.setDate(deliverOn.getDate() + parseInt(days));
const deliverOn = new Date();
    deliverOn.setMinutes(deliverOn.getMinutes() + parseInt(days));


    await FutureLetter.create({ email, letter, deliverOn });

    res.status(201).json({
      success: true,
      message: `Your letter will arrive in ${days} days.`,
      deliverOn,
    });
  } catch (err) {
    res.status(500).json({ error: "Could not save your letter." });
  }
});

module.exports = router;