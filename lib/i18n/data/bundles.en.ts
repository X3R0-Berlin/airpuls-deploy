/**
 * English translations for bundles / cross-sell data.
 * Source of truth (German): data/bundles.json
 * Prices, slugs, icons, images, and forProducts arrays are kept unchanged.
 */
export const bundlesEN = {
  heading: "Frequently bought together",
  items: [
    {
      slug: "katalysator-set",
      name: "Replacement Catalyst Set",
      description:
        "2\u00D7 catalyst discs \u2014 replacement recommended every 2 years",
      price: 14900,
      priceDisplay: "149.00",
      icon: "disc",
      image: null,
      forProducts: ["vitair"],
    },
    {
      slug: "atembrille",
      name: "Professional Breathing Cannula",
      description:
        "Medical nasal cannula for Solitair & Preventair",
      price: 8900,
      priceDisplay: "89.00",
      icon: "wind",
      image: null,
      forProducts: ["solitair", "preventair"],
    },
    {
      slug: "garantie-plus",
      name: "Warranty+ Extension",
      description: "Extends the warranty to a total of 5 years",
      price: 19900,
      priceDisplay: "199.00",
      icon: "shield-plus",
      image: null,
      forProducts: ["vitair", "solitair", "preventair"],
    },
  ],
} as const;
