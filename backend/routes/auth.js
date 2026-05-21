const express  = require("express");
const bcrypt   = require("bcryptjs");
const jwt      = require("jsonwebtoken");
const crypto   = require("crypto");
const User     = require("../models/User");
const UserActivity = require("../models/UserActivity");
const { sendResetEmail } = require("../services/emailService");
const protect  = require("../middleware/auth");
const router   = express.Router();

function issueToken(res, userId) {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
 res.cookie("chianyaToken", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  return token;
}

// Register
router.post("/register", async (req, res) => {
  try {
    const { firstName, email, password } = req.body;
    if (!firstName || !email || !password)
      return res.status(400).json({ error: "All fields are required." });
    if (password.length < 8)
      return res.status(400).json({ error: "Password must be at least 8 characters." });

    const exists = await User.findOne({ email });
    if (exists)
      return res.status(400).json({ error: "Email already registered." });

    const user = await User.create({ firstName, email, passwordHash: password });
    await UserActivity.create({ userId: user._id });

    issueToken(res, user._id);
    res.status(201).json({
      message: "Welcome to the forest.",
      user: { id: user._id, firstName: user.firstName, email: user.email },
    });
 } catch (err) {
    console.error("REGISTER ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: "Email and password required." });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ error: "Invalid credentials." });

    const valid = await user.comparePassword(password);
    if (!valid)
      return res.status(401).json({ error: "Invalid credentials." });

    // Update visit tracking
    await UserActivity.findOneAndUpdate(
      { userId: user._id },
      { $inc: { totalVisits: 1 }, lastVisited: Date.now() }
    );

    issueToken(res, user._id);
    res.json({
      message: "The forest welcomes you back.",
      user: { id: user._id, firstName: user.firstName, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ error: "Login failed." });
  }
});

// Logout
router.post("/logout", (req, res) => {
  res.clearCookie("chianyaToken", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  res.json({ message: "You have left the sanctuary." });
});
// Password reset request
router.post("/reset-password-request", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    // Always return same message — don't reveal if email exists
    const msg = { message: "If that email exists, a reset link has been sent." };
    if (!user) return res.json(msg);

    const token   = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 60 * 60 * 1000);
    user.resetToken   = token;
    user.resetExpires = expires;
    await user.save({ validateBeforeSave: false });

    const link = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
    await sendResetEmail(email, link);
    res.json(msg);
  } catch {
    res.status(500).json({ error: "Reset request failed." });
  }
});

// Password reset
router.post("/reset-password", async (req, res) => {
  try {
    const { token, password } = req.body;
    if (!token || !password)
      return res.status(400).json({ error: "Token and password required." });
    if (password.length < 8)
      return res.status(400).json({ error: "Password must be at least 8 characters." });

    const user = await User.findOne({
      resetToken: token,
      resetExpires: { $gt: Date.now() },
    });
    if (!user)
      return res.status(400).json({ error: "Invalid or expired reset link." });

    user.passwordHash = password;
    user.resetToken   = null;
    user.resetExpires = null;
    await user.save();

    res.json({ message: "Password updated. Please log in." });
  } catch {
    res.status(500).json({ error: "Password reset failed." });
  }
});

// Get current user
router.get("/me", protect, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;