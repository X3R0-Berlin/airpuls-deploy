import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

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
  return entry.count > 5; // max 5 requests per minute
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
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
    const email = body.email?.trim()?.toLowerCase();

    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Bitte gib eine gültige E-Mail-Adresse ein." },
        { status: 400 }
      );
    }

    const db = getDb();

    // Check for duplicate
    const existing = db
      .prepare("SELECT id FROM newsletter_subscribers WHERE email = ?")
      .get(email);

    if (existing) {
      return NextResponse.json(
        { error: "Diese E-Mail-Adresse ist bereits angemeldet." },
        { status: 409 }
      );
    }

    // Insert subscriber
    db.prepare(
      "INSERT INTO newsletter_subscribers (email) VALUES (?)"
    ).run(email);

    return NextResponse.json({
      success: true,
      message: "Vielen Dank! Du bist jetzt für unseren Newsletter angemeldet.",
    });
  } catch (error) {
    console.error("[Newsletter] Error:", error);
    return NextResponse.json(
      { error: "Ein Fehler ist aufgetreten. Bitte versuche es erneut." },
      { status: 500 }
    );
  }
}
