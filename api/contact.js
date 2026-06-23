// =====================================================================
// Vercel Serverless Function — POST /api/contact
// Sends contact-form messages by email using Nodemailer + Gmail SMTP.
//
// Required environment variables (set locally in .env and on Vercel):
//   GMAIL_USER           the Gmail address that SENDS the mail
//   GMAIL_APP_PASSWORD   16-char Gmail App Password (NOT your login password)
//   CONTACT_TO           (optional) inbox that RECEIVES messages
//                        defaults to mariamthabet2003@gmail.com
// =====================================================================
const nodemailer = require("nodemailer");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed." });
  }

  try {
    // Vercel parses JSON bodies automatically, but be defensive.
    const body =
      typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};

    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const message = String(body.message || "").trim();

    // --- validation ---
    if (!name || !email || !message) {
      return res.status(400).json({ ok: false, error: "All fields are required." });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ ok: false, error: "Please enter a valid email address." });
    }
    if (name.length > 120 || email.length > 200 || message.length > 5000) {
      return res.status(400).json({ ok: false, error: "Input too long." });
    }

    const user = process.env.GMAIL_USER;
    const pass = process.env.GMAIL_APP_PASSWORD;
    const to = process.env.CONTACT_TO || "mariamthabet2003@gmail.com";

    if (!user || !pass) {
      console.error("Missing GMAIL_USER / GMAIL_APP_PASSWORD env vars.");
      return res.status(500).json({ ok: false, error: "Email service is not configured yet." });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${user}>`, // must be the authenticated Gmail
      to,
      replyTo: `"${name}" <${email}>`,       // hitting "Reply" answers the visitor
      subject: `Portfolio message from ${name}`,
      text: `${message}\n\n— ${name}\n${email}`,
      html:
        `<div style="font-family:Arial,sans-serif;line-height:1.6">` +
        `<p style="white-space:pre-wrap">${escapeHtml(message)}</p>` +
        `<hr style="border:none;border-top:1px solid #eee">` +
        `<p><strong>${escapeHtml(name)}</strong><br>` +
        `<a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>` +
        `</div>`,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return res
      .status(500)
      .json({ ok: false, error: "Sorry, the message couldn't be sent. Please email directly." });
  }
};

// Escape user input before placing it in the HTML email body.
function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[c]));
}
