import nodemailer from "nodemailer";
import { brand } from "@/lib/brand";

interface SendMailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

function createTransport() {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || "587", 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

export async function sendMail(options: SendMailOptions): Promise<boolean> {
  const from = process.env.SMTP_FROM || brand.social.email;
  const transport = createTransport();

  if (!transport) {
    console.log("[Email] No SMTP configured — logging instead:");
    console.log(`  To: ${options.to}`);
    console.log(`  Subject: ${options.subject}`);
    console.log(`  Body: ${options.text || options.html.substring(0, 200)}...`);
    return true; // Return true so the app flow continues
  }

  try {
    await transport.sendMail({
      from,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
    });
    console.log(`[Email] Sent to ${options.to}: ${options.subject}`);
    return true;
  } catch (error) {
    console.error("[Email] Failed to send:", error);
    return false;
  }
}
