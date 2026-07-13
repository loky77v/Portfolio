import express from "express";
import path from "path";
import fs from "fs";
import crypto from "crypto";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

// Load environment variables
dotenv.config();

const PORT = 3000;
const DB_FILE = path.join(process.cwd(), "contacts.json");
const ENCRYPTION_KEY = process.env.CRYPTO_SECRET || "lokeshwara_super_secure_key_32_bytes_long_!"; // Must be 32 bytes

async function startServer() {
  const app = express();
  app.use(express.json());

  // API: Get health status
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // API: Simple Contact Form Handler with Real Email Relay
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, message } = req.body;

      if (!name || !email || !message) {
        return res.status(400).json({
          success: false,
          error: "All fields (name, email, message) are required.",
        });
      }

      const timestamp = new Date().toISOString();
      const newContact = {
        id: crypto.randomUUID(),
        name,
        email,
        message,
        timestamp,
      };

      // Save to contacts.json (Durable Persistence)
      let contacts = [];
      if (fs.existsSync(DB_FILE)) {
        try {
          const fileData = fs.readFileSync(DB_FILE, "utf8");
          contacts = JSON.parse(fileData);
        } catch (e) {
          console.error("Error reading contacts database:", e);
        }
      }
      contacts.push(newContact);
      fs.writeFileSync(DB_FILE, JSON.stringify(contacts, null, 2), "utf8");

      console.log("========================================");
      console.log(`PORTFOLIO MESSAGE RECEIVED`);
      console.log(`Timestamp: ${timestamp}`);
      console.log(`From: ${name} (${email})`);
      console.log(`Message: ${message}`);
      console.log("========================================");

      // Real Email Forwarding using Nodemailer if configured
      let emailSent = false;
      let emailError = null;
      const smtpUser = process.env.SMTP_USER;
      const smtpPass = process.env.SMTP_PASS;

      if (smtpUser && smtpPass) {
        try {
          const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
          const smtpPort = parseInt(process.env.SMTP_PORT || "587", 10);
          const secure = smtpPort === 465;

          const transporter = nodemailer.createTransport({
            host: smtpHost,
            port: smtpPort,
            secure,
            auth: {
              user: smtpUser,
              pass: smtpPass,
            },
          });

          const receiver = process.env.CONTACT_RECEIVER || "v333066@gmail.com";
          const altReceiver = "theboyz990707@gmail.com";

          await transporter.sendMail({
            from: `"${name} via Portfolio" <${smtpUser}>`,
            to: receiver,
            cc: altReceiver,
            replyTo: email,
            subject: `New Portfolio Message from ${name}`,
            text: `You received a new message from your portfolio website.\n\nFrom: ${name} <${email}>\nDate: ${timestamp}\n\nMessage:\n${message}`,
            html: `
              <div style="font-family: sans-serif; padding: 20px; max-width: 600px; border: 1px solid #e2e8f0; border-radius: 8px;">
                <h2 style="color: #0f172a; margin-top: 0;">New Portfolio Message</h2>
                <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
                <p><strong>From:</strong> ${name} (&lt;${email}&gt;)</p>
                <p><strong>Date:</strong> ${timestamp}</p>
                <div style="background-color: #f8fafc; padding: 15px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #10b981; white-space: pre-wrap; font-size: 14px; line-height: 1.5; color: #334155;">
                  ${message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}
                </div>
                <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
                <p style="font-size: 11px; color: #64748b; margin-bottom: 0;">This email was sent from your React & Express Portfolio contact page.</p>
              </div>
            `,
          });

          emailSent = true;
          console.log(`[SMTP] Email successfully sent to ${receiver}`);
        } catch (mailErr: any) {
          console.error("[SMTP] Error sending email:", mailErr);
          emailError = mailErr.message;
        }
      } else {
        console.warn("[SMTP] Credentials not found in environment variables. Define SMTP_USER and SMTP_PASS in .env to enable real email forwarding.");
      }

      res.json({
        success: true,
        message: emailSent 
          ? "Your message was sent successfully and forwarded to V Lokeshwara's inbox!" 
          : "Your message was saved successfully. (SMTP not configured on server yet)",
        data: {
          id: newContact.id,
          timestamp,
          emailSent,
          emailError,
        },
      });
    } catch (err: any) {
      console.error("Processing error:", err);
      res.status(500).json({
        success: false,
        error: "Server failed to process your contact request.",
      });
    }
  });

  // API: Get secure logs (demonstrates QA audit logging for portfolio inspection)
  app.get("/api/contacts", (req, res) => {
    // Basic protection using header or query parameter if configured, otherwise accessible for portfolio demo
    const passcode = req.query.passcode;
    if (passcode !== "lokesh-qa") {
      return res.status(401).json({ error: "Unauthorized. Admin passcode required." });
    }

    if (fs.existsSync(DB_FILE)) {
      try {
        const fileData = fs.readFileSync(DB_FILE, "utf8");
        return res.json(JSON.parse(fileData));
      } catch (e) {
        return res.status(500).json({ error: "Failed to read database." });
      }
    }
    res.json([]);
  });

  // Vite middleware setup for Development / Production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
