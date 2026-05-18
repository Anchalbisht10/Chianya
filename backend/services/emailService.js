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

module.exports = { sendResetEmail };