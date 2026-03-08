/**
 * English translations for FAQ data.
 * Source of truth (German): data/faq.json
 * The {{email}} placeholder is preserved for runtime substitution.
 */
export const faqEN = [
  {
    category: "Product",
    items: [
      {
        question: "What exactly does the Airimpuls air energizer do?",
        answer:
          "The Airimpuls air energizer produces energized air, similar to what occurs naturally in forests after a thunderstorm. Through a specialized process, the room air is enriched with negative ions, contributing to a fresher, more natural indoor climate.",
      },
      {
        question: "How loud is the device during operation?",
        answer:
          "The Airimpuls operates nearly silently at less than 25 dB — comparable to a whisper. You can use it in the bedroom or office without any disturbance.",
      },
      {
        question: "What room size is the Airimpuls suitable for?",
        answer:
          "The Airimpuls air energizer is designed for rooms up to approximately 40 m\u00B2. For larger rooms, we recommend using multiple devices or our upcoming Airimpuls Pro variant.",
      },
      {
        question: "Do I need to change filters?",
        answer:
          "The integrated stainless steel filter is long-lasting and only needs to be cleaned every 3\u20136 months. Replacement filters are available separately and easy to install.",
      },
    ],
  },
  {
    category: "Orders",
    items: [
      {
        question: "What payment methods are accepted?",
        answer:
          "We accept Visa, Mastercard, PayPal, and Klarna. All payments are securely processed through our payment provider Stripe.",
      },
      {
        question: "Will I receive an order confirmation?",
        answer:
          "Yes, immediately after a successful order you will receive a confirmation email with all the details of your order and a summary.",
      },
      {
        question: "Can I cancel my order?",
        answer:
          "As long as your order has not yet been shipped, you can cancel it free of charge. Simply contact us by email at {{email}} with your order number.",
      },
    ],
  },
  {
    category: "Shipping",
    items: [
      {
        question: "How long does delivery take?",
        answer:
          "Within Germany, delivery takes 3\u20135 business days. For Austria and Switzerland, please allow 5\u20138 business days. You will receive a tracking number by email as soon as your package is on its way.",
      },
      {
        question: "How much does shipping cost?",
        answer:
          "Standard shipping within Germany costs \u20AC4.90. For orders over \u20AC50, we offer free shipping within Germany. For Austria, shipping costs \u20AC6.90, and for Switzerland \u20AC9.90.",
      },
      {
        question: "Do you ship internationally?",
        answer:
          "We currently ship to Germany, Austria, and Switzerland. Expansion to additional EU countries is planned.",
      },
    ],
  },
  {
    category: "Returns",
    items: [
      {
        question: "Can I return the Airimpuls?",
        answer:
          "Yes, you have a 14-day right of withdrawal. Within 14 days of receipt, you can return the product without giving any reason. Details can be found in our cancellation policy.",
      },
      {
        question: "How does the return process work?",
        answer:
          "Send us a brief email to {{email}} with your order number. Pack the product securely and send it to our return address. After receipt and inspection, we will refund the purchase price within 14 days.",
      },
      {
        question: "Who pays the return shipping costs?",
        answer:
          "The direct costs of the return shipment are borne by the buyer. In the case of damaged or defective goods, we will of course cover the return shipping costs.",
      },
    ],
  },
] as const;
