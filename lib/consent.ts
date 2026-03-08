/**
 * Shared cookie-consent utility.
 *
 * The consent payload is stored in localStorage under `airimpuls_cookie_consent`
 * as JSON: { level: "all" | "essential", date: ISO-8601 }.
 *
 * Per GDPR / ePrivacy guidelines consent must be renewed at least every
 * 13 months, so we treat any consent older than that as expired.
 */

const CONSENT_KEY = "airimpuls_cookie_consent";
const CONSENT_MAX_AGE_MS = 13 * 30 * 24 * 60 * 60 * 1000; // ~13 months

export type ConsentLevel = "all" | "essential";

interface ConsentData {
  level: ConsentLevel;
  date: string;
}

/**
 * Read the current consent data from localStorage.
 * Returns `null` if no consent has been given or if the consent has expired.
 */
export function getConsent(): ConsentData | null {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const data: ConsentData = JSON.parse(raw);
    // Check expiration (13 months)
    const consentDate = new Date(data.date).getTime();
    if (Date.now() - consentDate > CONSENT_MAX_AGE_MS) {
      localStorage.removeItem(CONSENT_KEY);
      return null;
    }
    return data;
  } catch {
    return null;
  }
}

/**
 * Check whether the user has given consent at the required level.
 *
 * - `"essential"` -- returns true as long as *any* consent was given
 *   (both "all" and "essential" satisfy this).
 * - `"all"` -- returns true only if the user accepted all cookies.
 */
export function hasConsent(requiredLevel: ConsentLevel = "essential"): boolean {
  const consent = getConsent();
  if (!consent) return false;
  if (requiredLevel === "essential") return true; // essential is always OK if consent given
  return consent.level === "all";
}
