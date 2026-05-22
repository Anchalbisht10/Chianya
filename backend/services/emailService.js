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

module.exports = { sendResetEmail, sendFutureLetter };