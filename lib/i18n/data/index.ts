/**
 * Localized data accessors.
 *
 * German JSON files under data/ remain the single source of truth.
 * English overlays live next to this file as *.en.ts modules.
 *
 * Usage:
 *   import { getLocalizedFeatures } from "@/lib/i18n/data";
 *   const features = getLocalizedFeatures(locale);
 */

import type { Locale } from "../types";

// ── German data (source of truth) ──────────────────────────────────
import featuresDE from "@/data/features.json";
import statsDE from "@/data/stats.json";
import testimonialsDE from "@/data/testimonials.json";
import comparisonDE from "@/data/comparison.json";
import faqDE from "@/data/faq.json";
import affiliateDE from "@/data/affiliate.json";
import bundlesDE from "@/data/bundles.json";

// ── English overlays ───────────────────────────────────────────────
import { featuresEN } from "./features.en";
import { statsEN } from "./stats.en";
import { testimonialsEN } from "./testimonials.en";
import { comparisonEN } from "./comparison.en";
import { faqEN } from "./faq.en";
import { affiliateEN } from "./affiliate.en";
import { bundlesEN } from "./bundles.en";

// ── Accessor functions ─────────────────────────────────────────────

export function getLocalizedFeatures(locale: Locale) {
  return locale === "en" ? featuresEN : featuresDE;
}

export function getLocalizedStats(locale: Locale) {
  return locale === "en" ? statsEN : statsDE;
}

export function getLocalizedTestimonials(locale: Locale) {
  return locale === "en" ? testimonialsEN : testimonialsDE;
}

export function getLocalizedComparison(locale: Locale) {
  return locale === "en" ? comparisonEN : comparisonDE;
}

export function getLocalizedFaq(locale: Locale) {
  return locale === "en" ? faqEN : faqDE;
}

export function getLocalizedAffiliate(locale: Locale) {
  return locale === "en" ? affiliateEN : affiliateDE;
}

export function getLocalizedBundles(locale: Locale) {
  return locale === "en" ? bundlesEN : bundlesDE;
}
