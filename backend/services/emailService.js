const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendResetEmail(email, resetLink) {
  await transporter.sendMail({
    from: `"Chianya" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Reset your Chianya password",
    html: `
      <div style="font-family:Georgia,serif;max-width:480px;margin:0 auto;color:#1a3d10">
        <h2 style="font-weight:300;letter-spacing:0.15em">Chianya</h2>
        <p style="font-style:italic;color:#2a6020">Forest of Consciousness</p>
        <p>You requested a password reset. Click the link below — it expires in 1 hour.</p>
        <a href="${resetLink}"
          style="display:inline-block;padding:12px 28px;background:#1a5220;color:#d4f0c0;
          border-radius:40px;text-decoration:none;font-style:italic;margin:16px 0">
          Reset my password
        </a>
        <p style="font-size:12px;color:#666;margin-top:24px">
          If you didn't request this, ignore this email. Your account is safe.
        </p>
      </div>
    `,
  });
}

async function sendFutureLetter(email, letter, daysAgo) {
  await transporter.sendMail({
    from: `"Chianya — Forest of Consciousness" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `A letter you wrote to yourself ${daysAgo} days ago`,
    html: `
      <div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;
        background:#030e05;color:#a8e878;padding:2.5rem;border-radius:18px;">
        <h2 style="font-weight:300;letter-spacing:0.18em;color:#acf28e;
          font-size:28px;margin-bottom:4px;">Chianya</h2>
        <p style="font-style:italic;color:#5ec344;opacity:0.6;
          letter-spacing:0.3em;font-size:11px;margin-bottom:2rem;">
          forest of consciousness
        </p>
        <p style="font-style:italic;color:#8de068;opacity:0.7;
          margin-bottom:1.5rem;line-height:1.8;">
          The forest kept this for you. ${daysAgo} days ago, you wrote:
        </p>
        <div style="background:rgba(255,255,255,0.04);border-left:2px solid #4eb832;
          border-radius:8px;padding:1.5rem;margin-bottom:2rem;">
          <p style="font-style:italic;color:#b2f08a;line-height:2;
            white-space:pre-wrap;">${letter}</p>
        </div>
        <p style="font-style:italic;color:#5ec344;opacity:0.55;
          font-size:12px;line-height:1.9;">
          You are not the same person who wrote this.<br/>
          Notice what has changed. Notice what has stayed.<br/>
          The forest is still here.
        </p>
        <p style="font-style:italic;color:#3a8a22;opacity:0.4;
          font-size:11px;margin-top:2rem;">
          — Chianya · Forest of Consciousness
        </p>
      </div>
    `,
  });
}

async function sendWeatherReport(email, firstName, data) {
  const moodLines = [
    data.breathingSessions > 0 && `${data.breathingSessions} breathing session${data.breathingSessions > 1 ? "s" : ""}`,
    data.releaseSessions > 0 && `${data.releaseSessions} thing${data.releaseSessions > 1 ? "s" : ""} released into the forest`,
    data.antarSessions > 0 && `${data.antarSessions} conversation${data.antarSessions > 1 ? "s" : ""} with Antar`,
  ].filter(Boolean);

  const summaryLine = moodLines.length > 0
    ? moodLines.join(" · ")
    : "a quiet week in the forest";

  await transporter.sendMail({
    from: `"Chianya — Forest of Consciousness" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `Your week in the forest, ${firstName}`,
    html: `
      <div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;
        background:#030e05;color:#a8e878;padding:2.5rem;border-radius:18px;">

        <h2 style="font-weight:300;letter-spacing:0.18em;color:#acf28e;
          font-size:28px;margin-bottom:4px;">Chianya</h2>
        <p style="font-style:italic;color:#5ec344;opacity:0.6;
          letter-spacing:0.3em;font-size:11px;margin-bottom:2rem;">
          forest of consciousness
        </p>

        <p style="font-style:italic;color:#8de068;opacity:0.8;
          margin-bottom:0.5rem;font-size:13px;letter-spacing:0.1em;">
          your week in the forest
        </p>

        <h3 style="font-weight:300;color:#acf28e;font-size:22px;
          margin-bottom:1.5rem;letter-spacing:0.12em;">
          ${firstName}, the forest remembers this week.
        </h3>

        <div style="background:rgba(255,255,255,0.04);border-left:2px solid #4eb832;
          border-radius:8px;padding:1.5rem;margin-bottom:1.8rem;">
          <p style="font-size:11px;letter-spacing:0.22em;color:#5ec344;
            opacity:0.55;margin-bottom:0.8rem;">THIS WEEK YOU</p>
          <p style="font-style:italic;color:#b2f08a;line-height:2;font-size:14px;">
            ${summaryLine}
          </p>
          <p style="color:#5ec344;opacity:0.45;font-size:12px;margin-top:0.8rem;">
            ${data.weekSessions} moment${data.weekSessions > 1 ? "s" : ""} of care for yourself
          </p>
        </div>

        <p style="font-style:italic;color:#5ec344;opacity:0.65;
          line-height:2;font-size:13px;margin-bottom:1.8rem;">
          Every time you came to the forest, you chose yourself.<br/>
          That is not a small thing.
        </p>

        <a href="${process.env.FRONTEND_URL}"
          style="display:inline-block;padding:12px 28px;
          background:rgba(14,78,12,0.8);color:#b6fa90;
          border-radius:40px;text-decoration:none;
          font-style:italic;letter-spacing:0.14em;font-size:13px;
          border:0.5px solid rgba(102,222,70,0.5);">
          Return to the forest →
        </a>

        <p style="font-size:11px;color:#3a8a22;opacity:0.4;margin-top:2rem;">
          — Chianya · Forest of Consciousness<br/>
          You are receiving this because you have visited the sanctuary.
        </p>
      </div>
    `,
  });
}

module.exports = { sendResetEmail, sendFutureLetter, sendWeatherReport };