
require("dotenv").config();
const cron          = require("node-cron");
const FutureLetter  = require("./models/FutureLetter");
const { sendFutureLetter } = require("./services/emailService");
const express     = require("express");
const mongoose    = require("mongoose");
const cors        = require("cors");
const cookieParser= require("cookie-parser");
const helmet      = require("helmet");
const rateLimit   = require("express-rate-limit");


const authRoutes     = require("./routes/auth");
const antarRoutes    = require("./routes/antar");
const activityRoutes = require("./routes/activity");
const releaseRoutes  = require("./routes/release");
const wisdomRoutes   = require("./routes/wisdom");
const feedbackRoutes = require("./routes/feedback");
const futureLetterRoutes = require("./routes/futureLetter");

const app = express();

// ── Security ──────────────────────────────────────────────────
app.use(helmet());
app.use(cors({
  origin: [process.env.FRONTEND_URL, "https://chianya.vercel.app"],
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json({ limit: "10kb" }));
app.use("/api/feedback", feedbackRoutes);
app.use("/api/future-letter", futureLetterRoutes);

// ── Rate limiting ─────────────────────────────────────────────
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: "Too many requests. Please slow down." },
});
app.use("/api/", limiter);

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: { error: "Too many auth attempts." },
});
app.use("/api/auth/", authLimiter);

// ── Routes ────────────────────────────────────────────────────
app.use("/api/auth",     authRoutes);
app.use("/api/antar",    antarRoutes);
app.use("/api/activity", activityRoutes);
app.use("/api/release",  releaseRoutes);
app.use("/api/wisdom",   wisdomRoutes);

// ── Health check ──────────────────────────────────────────────
app.get("/api/health", (_, res) => {
  res.json({ status: "Chianya backend alive", sanctuary: true });
});

// ── 404 ───────────────────────────────────────────────────────
app.use((_, res) => {
  res.status(404).json({ error: "Not found" });
});

// ── Error handler ─────────────────────────────────────────────
app.use((err, _, res, __) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong in the sanctuary." });
});

// ── MongoDB + start ───────────────────────────────────────────
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected — forest is alive");
    app.listen(process.env.PORT, () => {
      console.log(`Chianya backend running on port ${process.env.PORT}`);
    });
  })
  .catch(err => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  });

  // Run every day at 8am — deliver future letters
    cron.schedule("0 8 * * *", async () => {
     
      try {
        const now = new Date();
        const letters = await FutureLetter.find({
          delivered: false,
          deliverOn: { $lte: now },
        });

        for (const l of letters) {
          const daysAgo = Math.round(
            (now - l.createdAt) / (1000 * 60 * 60 * 24)
          );
          await sendFutureLetter(l.email, l.letter, daysAgo);
          l.delivered = true;
          await l.save();
          console.log(`Future letter delivered to ${l.email}`);
        }
      } catch (err) {
        console.error("Cron error:", err.message);
      }
    });