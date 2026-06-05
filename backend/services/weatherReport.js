const cron = require("node-cron");
const User = require("../models/User");
const UserActivity = require("../models/UserActivity");
const Conversation = require("../models/Conversation");
const { sendWeatherReport } = require("./emailService");

async function generateWeatherReport(userId) {
  const activity = await UserActivity.findOne({ userId });
  if (!activity) return null;

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const recentConversations = await Conversation.find({
    userId,
    lastActive: { $gte: oneWeekAgo },
  }).select("messages");

  // Count sessions this week (approximate from total)
  const weekSessions =
    (activity.breathingSessionsCompleted || 0) +
    (activity.releaseSessionCount || 0) +
    (activity.groundSessionCount || 0) +
    (activity.justSitSessionCount || 0) +
    (activity.wisdomSessionCount || 0) +
    (activity.antarSessionCount || 0);

  return {
    weekSessions,
    breathingSessions: activity.breathingSessionsCompleted || 0,
    releaseSessions: activity.releaseSessionCount || 0,
    antarSessions: activity.antarSessionCount || 0,
    recentMessages: recentConversations.flatMap(c => c.messages).length,
  };
}

function startWeatherReportCron() {
 cron.schedule("0 9 * * 0", async () => {
    console.log("Running weekly weather report...");
    try {
      const users = await User.find({ email: { $exists: true } });
      for (const user of users) {
        try {
          const data = await generateWeatherReport(user._id);
          if (!data || data.weekSessions === 0) continue;
          await sendWeatherReport(user.email, user.firstName, data);
          console.log(`Weather report sent to ${user.email}`);
        } catch (err) {
          console.error(`Failed for ${user.email}:`, err.message);
        }
      }
    } catch (err) {
      console.error("Weather report cron error:", err.message);
    }
  });
}

module.exports = { startWeatherReportCron };