import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { sendMail } from "@/lib/email";
import { brand } from "@/lib/brand";

// Simple in-memory rate limiting
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60_000 });
    return false;
  }

  entry.count++;
  return entry.count > 3; // max 3 contact requests per minute
}

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Zu viele Anfragen. Bitte versuche es später erneut." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const name = body.name?.trim();
    const email = body.email?.trim()?.toLowerCase();
    const subject = body.subject?.trim();
    const message = body.message?.trim();

    // Validate
    if (!name || name.length < 2) {
      return NextResponse.json(
        { error: "Bitte gib deinen Namen ein." },
        { status: 400 }
      );
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Bitte gib eine gültige E-Mail-Adresse ein." },
        { status: 400 }
      );
    }

    if (!subject || subject.length < 3) {
      return NextResponse.json(
        { error: "Bitte gib einen Betreff ein." },
        { status: 400 }
      );
    }

    if (!message || message.length < 10) {
      return NextResponse.json(
        { error: "Die Nachricht muss mindestens 10 Zeichen lang sein." },
        { status: 400 }
      );
    }

    // Save to database
    const db = getDb();
    db.prepare(
      "INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)"
    ).run(name, email, subject, message);

    // Send notification email to shop owner
    const shopEmail = process.env.SMTP_FROM || brand.social.email;
    await sendMail({
      to: shopEmail,
      subject: `[Kontaktformular] ${subject}`,
      html: `
        <h2>Neue Kontaktanfrage</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>E-Mail:</strong> ${email}</p>
        <p><strong>Betreff:</strong> ${subject}</p>
        <hr />
        <p>${message.replace(/\n/g, "<br />")}</p>
      `,
      text: `Neue Kontaktanfrage\n\nName: ${name}\nE-Mail: ${email}\nBetreff: ${subject}\n\n${message}`,
    });

    return NextResponse.json({
      success: true,
      message:
        "Vielen Dank für deine Nachricht! Wir melden uns schnellstmöglich bei dir.",
    });
  } catch (error) {
    console.error("[Contact] Error:", error);
    return NextResponse.json(
      { error: "Ein Fehler ist aufgetreten. Bitte versuche es erneut." },
      { status: 500 }
    );
  }
}
