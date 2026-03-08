/**
 * English translations for comparison data.
 * Source of truth (German): data/comparison.json
 */
export const comparisonEN = {
  heading: "Which device is right for you?",
  subheading: "All three products in a direct comparison",
  products: ["vitair", "solitair", "preventair"] as const,
  features: [
    {
      label: "Application",
      values: {
        vitair: "Room air activation",
        solitair: "Personal breathing cannula",
        preventair: "Professional therapy",
      },
    },
    {
      label: "Target group",
      values: {
        vitair: "Home & office",
        solitair: "Health-conscious users",
        preventair: "Therapists & clinics",
      },
    },
    {
      label: "Technology",
      values: {
        vitair: "LED + Catalyst",
        solitair: "Pure catalyst",
        preventair: "High-performance activation",
      },
    },
    {
      label: "Electronics",
      check: {
        vitair: true,
        solitair: false,
        preventair: true,
      },
    },
    {
      label: "Breathing cannula",
      check: {
        vitair: false,
        solitair: true,
        preventair: true,
      },
    },
    {
      label: "Room air up to 40 m\u00B2",
      check: {
        vitair: true,
        solitair: false,
        preventair: false,
      },
    },
    {
      label: "Session duration",
      values: {
        vitair: "Continuous operation",
        solitair: "As needed",
        preventair: "15\u201320 min.",
      },
    },
    {
      label: "Sustainability",
      values: {
        vitair: "High",
        solitair: "Extremely high",
        preventair: "High",
      },
    },
  ],
} as const;
