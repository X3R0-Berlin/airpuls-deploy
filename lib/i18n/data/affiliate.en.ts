/**
 * English translations for affiliate program data.
 * Source of truth (German): data/affiliate.json
 * Numeric values (commission rates, cookie duration, payout minimum) are kept unchanged.
 */
export const affiliateEN = {
  program: {
    name: "AIRIMPULS Partner Program",
    cookieDurationDays: 30,
    linkFormat: "?ref=PARTNER_CODE",
    payoutMinimum: 50,
    currency: "EUR",
  },
  tiers: [
    {
      id: "kunde",
      name: "Customer",
      commission: 5,
      description:
        "Recommend AIRIMPULS to friends and family and receive a 5% commission on every sale.",
      benefits: [
        "5% commission per sale",
        "Personal referral link",
        "30-day cookie duration",
        "Monthly payout from \u20AC50",
      ],
      estimatedEarning: "approx. \u20AC82 per Vitair",
    },
    {
      id: "therapeut",
      name: "Therapist",
      commission: 8,
      description:
        "For naturopaths, physicians, and therapists: benefit from an increased commission and personalized support.",
      benefits: [
        "8% commission per sale",
        "Dedicated partner landing page",
        "Personal account manager",
        "Promotional material for your practice",
        "Priority support",
      ],
      estimatedEarning: "approx. \u20AC132 per Vitair",
    },
    {
      id: "creator",
      name: "Creator",
      commission: 10,
      description:
        "For content creators and influencers: the highest commission rate and an exclusive partnership.",
      benefits: [
        "10% commission per sale",
        "Test device for content creation",
        "Co-branded landing page",
        "Exclusive discount codes",
        "Featured on our website",
      ],
      estimatedEarning: "approx. \u20AC165 per Vitair",
    },
  ],
} as const;
