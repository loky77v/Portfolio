import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Content-Type", "application/json");

  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  const { name, email, message } = req.body || {};

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({ success: false, error: "Name, email and message are required." });
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_RECEIVER } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !CONTACT_RECEIVER) {
    return res.status(500).json({ success: false, error: "Contact email service is not configured." });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    await transporter.sendMail({
      from: SMTP_USER,
      to: CONTACT_RECEIVER,
      replyTo: email.trim(),
      subject: `Portfolio contact from ${name.trim()}`,
      text: `Name: ${name.trim()}\nEmail: ${email.trim()}\n\nMessage:\n${message.trim()}`,
      html: `<h3>New Portfolio Contact</h3><p><strong>Name:</strong> ${escapeHtml(name.trim())}</p><p><strong>Email:</strong> ${escapeHtml(email.trim())}</p><p><strong>Message:</strong></p><p>${escapeHtml(message.trim()).replace(/\n/g, "<br>")}</p>`,
    });

    return res.status(200).json({ success: true, data: { emailSent: true } });
  } catch (error) {
    console.error("Contact email error:", error);
    return res.status(500).json({ success: false, error: "Unable to send your message right now. Please try again later." });
  }
}

function escapeHtml(value: string) {
  return value.replace(/[&<>\"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '\"': "&quot;", "'": "&#39;" })[char] || char);
}
