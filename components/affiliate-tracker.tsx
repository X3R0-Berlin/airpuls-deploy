"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

/**
 * Tracks affiliate ref codes from URL parameters.
 * Stores in a cookie for 30 days so it persists across sessions.
 * The ref code is sent as Stripe metadata during checkout.
 */
export function AffiliateTracker() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const ref = searchParams.get("ref");
    if (ref && ref.length > 0 && ref.length <= 50) {
      // Store ref code in cookie for 30 days
      const expires = new Date();
      expires.setDate(expires.getDate() + 30);
      document.cookie = `airimpuls_ref=${encodeURIComponent(ref)};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
    }
  }, [searchParams]);

  return null;
}

/**
 * Utility to get the current affiliate ref code from cookies (client-side).
 */
export function getAffiliateRef(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/airimpuls_ref=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}
